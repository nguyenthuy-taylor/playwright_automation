pipeline {
    agent any

    parameters {
        choice(
            name: 'TARGET_ENV',
            choices: ['dev', 'test', 'staging'],
            description: 'Select environment to run test'
        )
    }

    tools {
        nodejs 'NodeJS 18'
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = '0'
        PATH = "${env.PATH};C:\\Users\\admin\\AppData\\Roaming\\npm"
        REPORT_DIR = 'playwright-report'
        DOCKER_IMAGE = 'my-playwright-image' // <-- đặt tên cố định cho Docker image
    }

    stages {
        stage('Install Dependencies & Browsers') {
            steps {
                echo 'Installing Node modules and Playwright browsers...'
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image for Playwright tests...'
                bat "docker build -t ${env.DOCKER_IMAGE} ."
            }
        }

        stage('Run Tests in Docker') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    script {
                        def baseUrl = ''
                        if (params.TARGET_ENV == 'dev') {
                            baseUrl = 'http://host.docker.internal/orangehrm/web/index.php/auth/login'
                        } else if (params.TARGET_ENV == 'staging') {
                            baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
                        } else {
                            baseUrl = 'http://localhost/orangehrm/web/index.php/dashboard/index'
                        }

                        echo "Running Playwright tests on ${baseUrl} in Docker..."

                        // Chạy container Docker với volume map để lấy report ra host
                        bat """
                            docker run --rm ^
                            -v %cd%\\${env.REPORT_DIR}:/app/${env.REPORT_DIR} ^
                            -e BASE_URL=${baseUrl} ^
                            -e ADMIN_USER=chungthuy ^
                            -e ADMIN_PASS=Thudong1237@ ^
                            my-playwright-image ^
                            npx playwright test --reporter=html
                            """
                    }
                }
            }
        }

        stage('Show HTML Report') {
            steps {
                echo 'Opening Playwright HTML report...'
                bat 'npx playwright show-report'
                bat "dir ${env.REPORT_DIR}"
            }
        }
    }

    post {
        always {
            echo 'Archiving HTML report as artifact...'
            archiveArtifacts artifacts: "${env.REPORT_DIR}/**", allowEmptyArchive: true
        }
    }
}
