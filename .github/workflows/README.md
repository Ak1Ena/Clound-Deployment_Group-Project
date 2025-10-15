# CI/CD Workflows Documentation

This repository uses GitHub Actions for Continuous Integration and Continuous Deployment.

## Workflows Overview

### 1. `main.yaml` - Testing Workflow (CI)

**Triggers:**
- Push to `dev` branch
- Pull requests to `main` branch

**Steps:**
1. Checkout code
2. Setup Node.js environment
3. Install dependencies (`npm ci`)
4. Build TypeScript code (`npm run build`)
5. **Verify dist folder exists** - Ensures build was successful
6. Run Auth tests (`npm run test:auth`)
7. Run Queue tests (`npm run test:queue`)
8. Run all tests (`npm test`)

**Purpose:** Ensures code quality by running automated tests before merging.

### 2. `deploy.yaml` - Deployment Workflow (CD)

**Triggers:**
- New release published
- Push tags starting with `v*` (e.g., `v1.0.0`)

**Steps:**
1. Checkout code
2. Setup Docker Buildx
3. Login to Docker Hub
4. Setup Node.js environment
5. **Test build locally** - Verify TypeScript compiles and dist folder is created
6. Extract version from tag
7. Build Docker image (multi-stage build)
8. Push to Docker Hub as:
   - `akiena/clound-deploy:latest`
   - `akiena/clound-deploy:<version>`

**Purpose:** Automatically builds and deploys Docker images to Docker Hub on releases.

## Setup Instructions

### 1. Configure Docker Hub Secrets

Add the following secrets to your GitHub repository:
- Go to `Settings` → `Secrets and variables` → `Actions`
- Add new repository secrets:
  - `DOCKER_USERNAME`: Your Docker Hub username
  - `DOCKER_PASSWORD`: Your Docker Hub password or access token

### 2. Testing Locally

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run specific tests
npm run test:auth
npm run test:queue

# Run all tests
npm test
```

### 3. Creating a Release

To trigger deployment to Docker Hub:

**Option 1: Create a release through GitHub UI**
1. Go to `Releases` → `Create a new release`
2. Create a new tag (e.g., `v1.0.0`)
3. Fill in release notes
4. Publish release

**Option 2: Create a tag through command line**
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 4. Adding New Tests

When developers create new tests:

1. Create test file in `src/Test/` directory
2. Update `package.json` to add test script:
   ```json
   "scripts": {
     "test:newtest": "npx ts-node src/Test/NewTest.ts"
   }
   ```
3. Update `main.yaml` workflow to include new test:
   ```yaml
   - name: Run NewTest tests
     run: npm run test:newtest
     continue-on-error: false
   ```
4. Update the main test script to include the new test:
   ```json
   "test": "npm run test:auth && npm run test:queue && npm run test:newtest"
   ```

## Test Files Location

Current test files:
- `src/Test/AuthTest.ts` - Authentication tests
- `src/Test/Queue.ts` - Queue management tests
- `src/Test/AdminTest.ts` - Admin functionality tests (if implemented)

## Docker Image

The built Docker images are available at:
- **Repository:** `akiena/clound-deploy`
- **Tags:**
  - `latest` - Latest release
  - `v1.0.0`, `v1.0.1`, etc. - Specific versions

### Pull and Run Docker Image

```bash
# Pull latest image
docker pull akiena/clound-deploy:latest

# Run container
docker run -p 80:80 akiena/clound-deploy:latest

# Pull specific version
docker pull akiena/clound-deploy:v1.0.0
```

## Workflow Status

You can check the status of workflows in the `Actions` tab of the GitHub repository.

## Troubleshooting

### Tests Failing
- Check the Actions tab for detailed logs
- Run tests locally to reproduce issues
- Ensure all dependencies are properly installed

### Deployment Failing
- Verify Docker Hub credentials are set correctly
- Check if the Dockerfile builds successfully locally
- Ensure tag format is correct (starts with `v`)

### Adding More Test Coverage
- Create new test files following existing patterns
- Update workflows to include new tests
- Ensure tests exit with proper status codes (0 for success, 1 for failure)

