# Dockerfile for serving Docker Documentation Mirror locally
# Build: docker build -t docker-docs-mirror .
# Run: docker run -p 8080:80 docker-docs-mirror

# Stage 1: Mirror the documentation
FROM alpine:latest as mirror

# Install wget for mirroring
RUN apk add --no-cache wget ca-certificates bash

WORKDIR /mirror

# Copy mirror script
COPY mirror.sh /mirror/

# Run the mirror (this can take a while)
# For faster builds, you can pre-download and copy the public folder instead
# RUN chmod +x mirror.sh && ./mirror.sh -o /mirror/public

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy mirrored content
# Option 1: Copy from mirror stage (uncomment RUN above)
# COPY --from=mirror /mirror/public /usr/share/nginx/html

# Option 2: Copy pre-built public folder (faster)
COPY public/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
