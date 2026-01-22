#!/bin/bash
#
# Docker Documentation Mirror Script using HTTrack
# HTTrack provides more sophisticated mirroring capabilities than wget
#
# Prerequisites:
#   Ubuntu/Debian: sudo apt-get install httrack
#   macOS: brew install httrack
#   Alpine: apk add httrack
#
# Usage:
#   ./mirror-httrack.sh [options]
#

set -euo pipefail

# Default configuration
DOCKER_DOCS_URL="https://docs.docker.com"
OUTPUT_DIR="./public"
PROJECT_NAME="docker-docs"
CACHE_DIR="./.httrack-cache"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

show_help() {
    cat << EOF
Docker Documentation Mirror Script (HTTrack)

HTTrack provides more sophisticated website mirroring with better
link handling, resumable downloads, and update capabilities.

USAGE:
    ./mirror-httrack.sh [options]

OPTIONS:
    -o, --output DIR    Output directory (default: ./public)
    -u, --update        Update existing mirror instead of fresh download
    -c, --continue      Continue interrupted download
    -h, --help          Show this help message

EXAMPLES:
    # Fresh mirror
    ./mirror-httrack.sh

    # Update existing mirror
    ./mirror-httrack.sh -u

    # Continue interrupted download
    ./mirror-httrack.sh -c

HTTRACK ADVANTAGES:
    - Better link conversion and handling
    - Built-in update/continue functionality
    - More reliable for large sites
    - Better handling of JavaScript-generated content
    - Built-in caching system

EOF
}

check_httrack() {
    if ! command -v httrack &> /dev/null; then
        print_error "httrack is not installed. Please install it first."
        echo ""
        echo "Installation instructions:"
        echo "  Ubuntu/Debian: sudo apt-get install httrack"
        echo "  macOS:         brew install httrack"
        echo "  Alpine:        apk add httrack"
        echo "  Arch:          sudo pacman -S httrack"
        exit 1
    fi
    print_success "httrack is available"
}

# Parse arguments
UPDATE_MODE=false
CONTINUE_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -u|--update)
            UPDATE_MODE=true
            shift
            ;;
        -c|--continue)
            CONTINUE_MODE=true
            shift
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

main() {
    echo ""
    echo "=========================================="
    echo "  Docker Documentation Mirror (HTTrack)"
    echo "=========================================="
    echo ""

    check_httrack

    mkdir -p "$OUTPUT_DIR"
    mkdir -p "$CACHE_DIR"

    print_info "Starting HTTrack mirror..."
    print_info "Source URL: $DOCKER_DOCS_URL"
    print_info "Output directory: $OUTPUT_DIR"

    # Build HTTrack options
    HTTRACK_OPTS=""
    
    if [ "$UPDATE_MODE" = true ]; then
        print_info "Mode: Update existing mirror"
        HTTRACK_OPTS="--update"
    elif [ "$CONTINUE_MODE" = true ]; then
        print_info "Mode: Continue interrupted download"
        HTTRACK_OPTS="--continue"
    else
        print_info "Mode: Fresh download"
    fi

    # Run HTTrack
    httrack "$DOCKER_DOCS_URL" \
        -O "$OUTPUT_DIR,$CACHE_DIR" \
        $HTTRACK_OPTS \
        --robots=0 \
        --depth=10 \
        --ext-depth=1 \
        --max-rate=500000 \
        --connection-per-second=2 \
        --sockets=4 \
        --timeout=60 \
        --retries=3 \
        --keep-alive \
        --near \
        --stay-on-same-domain \
        --urlhack \
        -"%P" \
        "+*.docker.com/*" \
        "-*.exe" "-*.dmg" "-*.pkg" "-*.deb" "-*.rpm" "-*.msi" \
        "-*.tar.gz" "-*.zip" "-*.iso" \
        "-*/releases/*" "-*/download/*" "-*/api/*" \
        --footer "" \
        --quiet \
        2>&1 | tee httrack-mirror.log || true

    print_success "HTTrack mirror completed"

    # Move content from httrack structure to public root if needed
    if [ -d "$OUTPUT_DIR/docs.docker.com" ]; then
        print_info "Restructuring output directory..."
        cp -r "$OUTPUT_DIR/docs.docker.com"/* "$OUTPUT_DIR/" 2>/dev/null || true
        rm -rf "$OUTPUT_DIR/docs.docker.com"
    fi

    # Show summary
    echo ""
    print_info "Mirror Summary:"
    echo "----------------------------------------"
    if [ -d "$OUTPUT_DIR" ]; then
        local size=$(du -sh "$OUTPUT_DIR" 2>/dev/null | cut -f1)
        local files=$(find "$OUTPUT_DIR" -type f 2>/dev/null | wc -l)
        echo "Total size: $size"
        echo "Total files: $files"
    fi
    echo "----------------------------------------"
    print_success "Mirror completed successfully!"
}

main "$@"
