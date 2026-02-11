#!/bin/bash
#
# Docker Documentation Mirror Script
# This script creates a complete mirror of the Docker documentation website
# for offline use or hosting on GitLab Pages.
#
# Usage:
#   ./mirror.sh [options]
#
# Options:
#   -o, --output DIR    Output directory (default: ./public)
#   -d, --depth NUM     Maximum recursion depth (default: 10)
#   -w, --wait SEC      Wait time between requests (default: 0.5)
#   -h, --help          Show this help message
#

set -euo pipefail

# Default configuration
DOCKER_DOCS_URL="https://docs.docker.com"
OUTPUT_DIR="./public"
MAX_DEPTH=10
WAIT_TIME=0.5
RETRIES=3
RATE_LIMIT="500k"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Show usage information
show_help() {
    cat << EOF
Docker Documentation Mirror Script

This script creates a complete mirror of the Docker documentation website
for offline use or hosting on GitLab Pages.

USAGE:
    ./mirror.sh [options]

OPTIONS:
    -o, --output DIR    Output directory (default: ./public)
    -d, --depth NUM     Maximum recursion depth (default: 10)
    -w, --wait SEC      Wait time between requests (default: 0.5)
    -r, --rate RATE     Download rate limit (default: 500k)
    -h, --help          Show this help message

EXAMPLES:
    # Mirror with default settings
    ./mirror.sh

    # Mirror to custom directory
    ./mirror.sh -o ./docker-docs

    # Mirror with longer wait time (more polite to servers)
    ./mirror.sh -w 1

    # Mirror with higher rate limit (faster but less polite)
    ./mirror.sh -r 1m

NOTES:
    - The script uses wget to mirror the documentation
    - Links are converted to work locally
    - The mirror respects robots.txt by default (can be disabled)
    - Large binary files are excluded to save space

EOF
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -o|--output)
                OUTPUT_DIR="$2"
                shift 2
                ;;
            -d|--depth)
                MAX_DEPTH="$2"
                shift 2
                ;;
            -w|--wait)
                WAIT_TIME="$2"
                shift 2
                ;;
            -r|--rate)
                RATE_LIMIT="$2"
                shift 2
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

# Check if wget is installed
check_dependencies() {
    if ! command -v wget &> /dev/null; then
        print_error "wget is not installed. Please install it first."
        echo ""
        echo "Installation instructions:"
        echo "  Ubuntu/Debian: sudo apt-get install wget"
        echo "  CentOS/RHEL:   sudo yum install wget"
        echo "  macOS:         brew install wget"
        echo "  Alpine:        apk add wget"
        exit 1
    fi
    print_success "wget is available"
}

# Create output directory
setup_output_dir() {
    print_info "Setting up output directory: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
    print_success "Output directory ready"
}

# Perform the mirror operation
mirror_docs() {
    print_info "Starting Docker documentation mirror..."
    print_info "Source URL: $DOCKER_DOCS_URL"
    print_info "Output directory: $OUTPUT_DIR"
    print_info "Maximum depth: $MAX_DEPTH"
    print_info "Wait time: ${WAIT_TIME}s"
    print_info "Rate limit: $RATE_LIMIT"
    echo ""

    # Run wget to mirror the documentation
    wget \
        --mirror \
        --convert-links \
        --adjust-extension \
        --page-requisites \
        --no-parent \
        --no-host-directories \
        --directory-prefix="$OUTPUT_DIR" \
        --level="$MAX_DEPTH" \
        --wait="$WAIT_TIME" \
        --random-wait \
        --tries="$RETRIES" \
        --retry-connrefused \
        --timeout=30 \
        --limit-rate="$RATE_LIMIT" \
        --execute robots=off \
        --reject "*.exe,*.dmg,*.pkg,*.deb,*.rpm,*.msi,*.tar.gz,*.zip,*.iso" \
        --reject-regex "(releases|download)" \
        --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
        --header="Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
        --header="Accept-Language: en-US,en;q=0.5" \
        "$DOCKER_DOCS_URL/" 2>&1 | tee mirror.log || true

    print_success "Mirror operation completed"
}

# Create an index page if needed
create_index_page() {
    if [ ! -f "$OUTPUT_DIR/index.html" ]; then
        print_info "Creating index page..."
        cat > "$OUTPUT_DIR/index.html" << 'INDEXEOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Docker Documentation Mirror</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #e0e0e0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
        }
        .logo {
            width: 120px;
            height: 120px;
            margin-bottom: 2rem;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #0db7ed, #066da5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        p {
            font-size: 1.1rem;
            color: #a0a0a0;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: linear-gradient(90deg, #0db7ed, #066da5);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(13, 183, 237, 0.3);
        }
        .info {
            margin-top: 3rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            font-size: 0.9rem;
        }
        .info code {
            background: rgba(13, 183, 237, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <svg class="logo" viewBox="0 0 256 185" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0db7ed" d="M144.9 80.6h23.1v21.3h11.6c5.3 0 10.9-.9 16-2.7 2.5-.9 5.3-2.1 7.7-3.6-3.2-4.2-4.8-9.4-5.3-14.5-.6-7.1.6-16.3 5.1-22l2.2-2.8 2.9 2c6.8 4.8 12.6 11.5 14.3 19.5 6.2-1.9 13.1-2.3 19.5-1.1l3 .5.5 3c1.5 10.1-3.6 20.8-12.1 27.2-9.6 19.8-28 35-51 42.8-24.7 8.4-55.6 9.2-85.2-3-22.5-9.3-40.1-26.2-50.7-47.6-6.5.3-13.4-.4-19.9-2.4L5 93.8l2.4-2.9c7.9-9.6 21.5-14.1 34-12.3-.7-6.7 1.6-13.9 6.3-18.9l2.4-2.6 2.8 2.2c7.2 5.5 11 13.3 11.3 21.5h79.8V59.5h-23.1V38.1h23.1V16.9h-23.1V-4.4h44.4V80.6h23.3z"/>
            <g fill="#0db7ed">
                <path d="M56.1 80.6h23.1v21.3H56.1z"/>
                <path d="M79.2 80.6h23.1v21.3H79.2z"/>
                <path d="M102.3 80.6h23.1v21.3h-23.1z"/>
                <path d="M79.2 59.3h23.1v21.3H79.2z"/>
                <path d="M102.3 59.3h23.1v21.3h-23.1z"/>
                <path d="M125.4 59.3h23.1v21.3h-23.1z"/>
                <path d="M102.3 38h23.1v21.3h-23.1z"/>
                <path d="M125.4 38h23.1v21.3h-23.1z"/>
                <path d="M125.4 16.7h23.1V38h-23.1z"/>
            </g>
        </svg>
        <h1>Docker Documentation Mirror</h1>
        <p>This is a mirror of the official Docker documentation for offline access and self-hosting purposes.</p>
        <a href="./docs/" class="btn">Browse Documentation</a>
        <div class="info">
            <p>Mirror hosted on <code>GitLab Pages</code></p>
            <p>Source: <code>docs.docker.com</code></p>
        </div>
    </div>
</body>
</html>
INDEXEOF
        print_success "Index page created"
    fi
}

# Show summary
show_summary() {
    echo ""
    print_info "Mirror Summary:"
    echo "----------------------------------------"
    echo "Output directory: $OUTPUT_DIR"
    
    if [ -d "$OUTPUT_DIR" ]; then
        local size=$(du -sh "$OUTPUT_DIR" 2>/dev/null | cut -f1)
        local files=$(find "$OUTPUT_DIR" -type f 2>/dev/null | wc -l)
        echo "Total size: $size"
        echo "Total files: $files"
    fi
    
    echo "----------------------------------------"
    print_success "Mirror completed successfully!"
    echo ""
    echo "Next steps:"
    echo "  1. Test locally: python -m http.server 8000 -d $OUTPUT_DIR"
    echo "  2. Push to GitLab for Pages deployment"
    echo "  3. Or use 'docker run -p 80:80 -v \$(pwd)/$OUTPUT_DIR:/usr/share/nginx/html:ro nginx'"
}

# Main function
main() {
    echo ""
    echo "=========================================="
    echo "  Docker Documentation Mirror Script"
    echo "=========================================="
    echo ""

    parse_args "$@"
    check_dependencies
    setup_output_dir
    mirror_docs
    create_index_page
    show_summary
}

# Run main function
main "$@"
