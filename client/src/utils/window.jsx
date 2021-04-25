import { debounce } from 'lodash';
const WINDOW_SCROLLBAR_WIDTH = 'WINDOW_SCROLLBAR_WIDTH';

export const getViewport = () => {
    let viewPortWidth;
    let viewPortHeight;
   
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth !== 'undefined') {
      viewPortWidth = window.innerWidth;
      viewPortHeight = window.innerHeight;
    }
   
   // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement !== 'undefined'
    && typeof document.documentElement.clientWidth !==
    'undefined' && document.documentElement.clientWidth !== 0) {
       viewPortWidth = document.documentElement.clientWidth;
       viewPortHeight = document.documentElement.clientHeight;
    }
   
    // older versions of IE
    else {
      viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
      viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
    }

    return [viewPortWidth, viewPortHeight];
}

export const getScrolls = () => {
    const top  = window.pageYOffset || document.documentElement.scrollTop;
    const left = window.pageXOffset || document.documentElement.scrollLeft;

    return [left, top];
}

export const scrollToElement = (selector = 'body') => {
    if (window.scroll && selector) {
        const element = document.querySelector(selector);
        if (element && element.scrollIntoView) {
            element.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }
};

export const getSrollbarWidth = () => {
    const viewport = getViewport();
    if (window.sessionStorage) {
        const storedWidth = sessionStorage.getItem(WINDOW_SCROLLBAR_WIDTH);
        if (storedWidth) {
            return parseInt(storedWidth, 10);
        } else {
            const windowWidth = viewport[0] - document.documentElement.clientWidth;
            if (windowWidth > 0) sessionStorage.setItem(WINDOW_SCROLLBAR_WIDTH, windowWidth);

            return windowWidth;
        }
    }
    return viewport[0] - document.documentElement.clientWidth;
}

export const toggleModalBodyClass = (open, slidePanel = false) => {
    const body = document.body;
    const header = body.getElementsByClassName('tr__header');
    const scrollbarWidth = getSrollbarWidth();
    const isScrollable = document.body.scrollHeight > window.innerHeight;
    if (open) {
        if (scrollbarWidth > 0 && isScrollable) {
            body.style.paddingRight = `${scrollbarWidth}px`;
            if (slidePanel && header && header.length > 0) header[0].style.marginRight = `${-scrollbarWidth}px`;
        }
        body.classList.add('modal-open');
    } else {
        body.classList.remove('modal-open');
        if (scrollbarWidth > 0) {
            body.style.paddingRight = 0;
            if (slidePanel && header && header.length > 0) header[0].style.marginRight = 0;
        }
    }
}

export const isModalOpen = () => {
    const body = document.body;
    const modals = body.getElementsByClassName('tr__modal');
    let isNotificationModals = false;

    for (let i = 0; i < modals.length; i++) {
        isNotificationModals = modals[i].classList.contains('tr__notification');
        if (isNotificationModals) break;
    }
    
    return modals.length > 0 && !isNotificationModals;
}

/**
 * TODO: Deprecated
 * Cause this function return a callback, can't implement using async/await,
 *  just using function getBase64DataFile below in the future.
 */
export const getBase64Image = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

/**
 * Get base64 data of file (new func for replace old getBase64Image func, return type is promise data)
 *
 * @param {any} file
 * @returns {Promise<string>}
 */
export const getBase64DataFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => { resolve(reader.result) });
        reader.readAsDataURL(file);
    });
}

export const isOutsideViewport = bounding => {
    const { top, height } = bounding;
    const viewportHeight = getViewport()[1];
    const scrollY = getScrolls()[1];

    if (top > 0 && height > 0) {
        return top + height + scrollY > viewportHeight;
    }

    return false;
}

export const onDropdownShown = element => {
    const dropdownBounding = element ? element.getBoundingClientRect() : null;
    if (dropdownBounding) {
        const isOutsideView = isOutsideViewport(dropdownBounding);
        if (isOutsideView) element.classList.add('top');
        else element.classList.remove('top')
    }
}

export const addWindowScrollingEvent = element => {
    window.addEventListener('scroll', debounce(() => {
        onDropdownShown(element);
    }, 100));
}

export const copyToClipboard = target => {
    const targetElement = document.getElementById(target);
    if (targetElement) {
        targetElement.select();

        if (document.execCommand('copy')) {
            return true;
        }
    }
    return false;
}
