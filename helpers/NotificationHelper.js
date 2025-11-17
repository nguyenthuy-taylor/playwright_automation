import { logInfo, logWarn } from '../helpers/loggers.js';


export class NotificationHelper {
    constructor(page) {
        this.page = page;
        this.successToastMessage = '.oxd-toast--success';
        this.loadingIcon = '.oxd-loading-spinner';
    }

    async waitForLoadingFired(appearTimeout = 5000, disappearTimeout = 10000, retryInterval = 500) {
        const loadingLocator = this.page.locator(this.loadingIcon);

        // 1️⃣ Chờ loading icon xuất hiện, retry nhiều lần
        const startAppear = Date.now();
        while (Date.now() - startAppear < appearTimeout) {
            const count = await loadingLocator.count();
            if (count > 0) {
                logInfo(`[INFO] Phát hiện ${count} loading icon.`);
                break;
            }
            await this.page.waitForTimeout(retryInterval); // đợi một khoảng nhỏ
        }

        // Nếu không thấy icon sau appearTimeout
        if ((await loadingLocator.count()) === 0) {
            logInfo('[INFO] Không thấy loading icon xuất hiện.');
            return;
        }

        // 2️⃣ Chờ tất cả icon biến mất, retry nhiều lần
        const startDisappear = Date.now();
        while (Date.now() - startDisappear < disappearTimeout) {
            const count = await loadingLocator.count();
            if (count === 0) {
                logInfo('[INFO] Tất cả loading icon đã biến mất.');
                return;
            }
            await this.page.waitForTimeout(retryInterval);
        }

        // Nếu còn icon sau timeout
        const remaining = await loadingLocator.count();
        if (remaining > 0) {
            logWarn(`[WARN] Vẫn còn ${remaining} loading icon sau ${disappearTimeout}ms.`);
        }
    }




}

