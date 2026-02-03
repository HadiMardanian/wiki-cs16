# Docker Documentation Mirror for GitLab Pages

This project creates a complete mirror of the [Docker Documentation](https://docs.docker.com) website and hosts it on GitLab Pages for offline access or self-hosting purposes.

## Overview

The mirror uses `wget` to recursively download the Docker documentation website, converting all links to work locally. The mirrored content is then automatically deployed to GitLab Pages via the CI/CD pipeline.

## Features

- **Complete mirror** of Docker documentation with all pages, images, and assets
- **Automatic link conversion** for offline/local browsing
- **GitLab Pages deployment** with automatic updates
- **Scheduled updates** support for keeping the mirror current
- **Configurable options** for mirroring depth, rate limiting, and more
- **Respectful mirroring** with rate limiting and proper user agent

## Quick Start

### Option 1: GitLab CI/CD (Recommended)

1. **Create a new GitLab repository**:
   ```bash
   git clone <your-gitlab-repo-url>
   cd <repo-name>
   ```

2. **Copy the project files**:
   Copy all files from this directory to your GitLab repository.

3. **Push to GitLab**:
   ```bash
   git add .
   git commit -m "Initial commit: Docker documentation mirror setup"
   git push origin main
   ```

4. **Enable GitLab Pages**:
   - Go to your GitLab project → Settings → Pages
   - Ensure Pages is enabled for your project

5. **Run the pipeline**:
   - The pipeline will automatically run on push
   - Or manually trigger it via CI/CD → Pipelines → Run pipeline

6. **Access your mirror**:
   - Your documentation will be available at `https://<username>.gitlab.io/<project-name>/`

### Option 2: Local Mirroring

1. **Clone this repository**:
   ```bash
   git clone <repo-url>
   cd docker-docs-mirror
   ```

2. **Run the mirror script**:
   ```bash
   chmod +x mirror.sh
   ./mirror.sh
   ```

3. **Test locally**:
   ```bash
   # Using Python
   python -m http.server 8000 -d public
   
   # Or using Docker/Nginx
   docker run -p 8080:80 -v $(pwd)/public:/usr/share/nginx/html:ro nginx
   ```

4. **Access at**: `http://localhost:8000` or `http://localhost:8080`

## Configuration

### Environment Variables (GitLab CI/CD)

| Variable | Default | Description |
|----------|---------|-------------|
| `DOCKER_DOCS_URL` | `https://docs.docker.com` | Base URL to mirror |
| `MIRROR_DIR` | `public` | Output directory |
| `MAX_DEPTH` | `10` | Maximum recursion depth |
| `WAIT_TIME` | `0.5` | Wait time between requests (seconds) |
| `RETRIES` | `3` | Number of retry attempts |

### Script Options

```bash
./mirror.sh [options]

Options:
  -o, --output DIR    Output directory (default: ./public)
  -d, --depth NUM     Maximum recursion depth (default: 10)
  -w, --wait SEC      Wait time between requests (default: 0.5)
  -r, --rate RATE     Download rate limit (default: 500k)
  -h, --help          Show help message
```

## Scheduled Updates

To keep your mirror up-to-date, set up a scheduled pipeline in GitLab:

1. Go to **CI/CD** → **Schedules**
2. Click **New schedule**
3. Configure:
   - **Description**: Weekly Docker docs update
   - **Interval Pattern**: `0 2 * * 0` (every Sunday at 2 AM)
   - **Target branch**: `main`
4. Click **Save pipeline schedule**

## Project Structure

```
docker-docs-mirror/
├── .gitlab-ci.yml    # GitLab CI/CD configuration
├── mirror.sh         # Local mirroring script
├── .gitignore        # Git ignore rules
├── README.md         # This file
└── public/           # Generated mirror content (gitignored)
```

## GitLab Pages Configuration

The `.gitlab-ci.yml` file is configured to:

1. **Mirror stage**: Downloads the Docker documentation using wget
2. **Deploy stage**: Deploys the `public/` directory to GitLab Pages

### Pipeline Jobs

- `mirror_docs`: Main mirroring job (runs on push and manual triggers)
- `pages`: GitLab Pages deployment job
- `scheduled_mirror`: Job for scheduled updates

## Disk Space Requirements

The full Docker documentation mirror typically requires:
- **Minimum**: 500MB - 1GB
- **Recommended**: 2-3GB free space

GitLab CI/CD runners usually have sufficient space, but be aware of artifact storage limits.

## Customization

### Mirroring Specific Sections

To mirror only specific sections, modify the `DOCKER_DOCS_URL` in `.gitlab-ci.yml`:

```yaml
variables:
  # Mirror only the engine docs
  DOCKER_DOCS_URL: "https://docs.docker.com/engine"
```

### Excluding Content

Add patterns to the `--reject` or `--reject-regex` flags in the wget command:

```bash
--reject "*.exe,*.dmg,*.pkg,*.deb,*.rpm" \
--reject-regex "(releases|download|api)"
```

### Custom Styling

To add custom branding, modify the `index.html` generation in the script or add custom CSS files to the `public/` directory.

## Troubleshooting

### Common Issues

1. **Mirror takes too long**:
   - Increase `WAIT_TIME` to be more polite
   - Reduce `MAX_DEPTH` to limit scope
   - Add more patterns to `--reject`

2. **Broken links in mirror**:
   - Ensure `--convert-links` is enabled
   - Check if external resources are being rejected

3. **Pipeline fails with disk space**:
   - Use GitLab's larger runners
   - Reduce mirror scope
   - Enable caching to reuse previous downloads

4. **Pages not updating**:
   - Check that the `pages` job completed successfully
   - Verify Pages is enabled in project settings
   - Check the Pages URL in Settings → Pages

### Logs

View mirroring logs in:
- GitLab CI/CD job output
- Local `mirror.log` file (when using the script)

## Legal Considerations

- This tool is intended for personal/educational use
- Respect Docker's terms of service and robots.txt
- Use appropriate rate limiting to avoid overloading servers
- Consider contributing back to Docker's open-source projects

## Contributing

Contributions are welcome! Please submit issues and pull requests.

## License

This project is provided as-is for educational purposes. The Docker documentation content remains under Docker's copyright and licensing.

---

**Note**: This is an unofficial mirror. For the most up-to-date documentation, visit [docs.docker.com](https://docs.docker.com).
