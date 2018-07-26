
import { isIDApp, getAppVersion } from './isAPP';


export function oldAppVersionComp (AndroidVersion, IosVersion) {
    let AV = getAppVersion();
    if (isIDApp() && typeof AV === 'string') {
        const [one, two] = AV.split('.');
        // version lower 3.2.0
        if (+one < 3 || +two < 2) {
            window.location.href = 'https://m.jd.id/tips/download.html';
            return false;
        } else if (!(AV === AndroidVersion || AV === IosVersion)) {
            // version lower productOnLineVersion (e.g. 3.3.0)
            window.location.href = 'http://m.jd.id/tips/coming.html';
            return false;
        }
    }
}


