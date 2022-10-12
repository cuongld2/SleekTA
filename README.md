### Prerequisite in order to run the test
- Already installed Git and setup ssh access to GitHub repository
- Already install Docker
- Already installed Node (preferrably version >16)

### There are 3 ways to run the tests

#### 1. Using node in local machine

```bash
git clone repository
cd SleekTA
npm install
npm run test
```

#### 2. Using docker

```bash
git clone repository
cd SleekTA
docker build -t playwright-docker .
docker run -it playwright-docker:latest npm run test
```

#### 3. Through GitHub Actions
Given we already defined the `test.yml` file in `.github/workflows` directory, the test code will automatically be triggered with every push
