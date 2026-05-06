# Base image: Node 20 on Debian Bookworm slim
FROM node:20-bookworm-slim

# Install Java (required for Firebase Emulators) and other essentials
RUN apt-get update && apt-get install -y --no-install-recommends \
    openjdk-17-jre-headless \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Expose ports
# 4200  - Angular dev server
# 4000  - Firebase Emulator UI
# 5001  - Cloud Functions emulator
# 8080  - Firestore emulator
# 9099  - Auth emulator
# 9199  - Storage emulator
EXPOSE 4200 4000 5001 8080 9099 9199

# Default: install deps and start Angular dev server
CMD ["sh", "-c", "npm install && npm run start -- --host 0.0.0.0 --poll 2000"]
