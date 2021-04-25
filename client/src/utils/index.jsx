import {
    lazy
} from 'react';
import moment from 'moment';
import {
    ADMIN,
    MEMBER,
    OWNER
} from 'actions';
import {
    roleList
} from './mock';

import * as _ from 'lodash';
export * from 'utils/window';
export * from 'utils/mock';
export * from 'utils/map';
export * from 'utils/validation';
export * from 'utils/cookie';

export const delayImport = (comp) => lazy(() => {
    return Promise.all([
            comp,
            new Promise(resolve => setTimeout(resolve, 250))
        ])
        .then(([moduleExports]) => moduleExports);
});

export const sizeInMB = size => {
    const unit = 1024;
    return size / unit > unit ?
        (size / (unit * unit)).toFixed(1) + ' MB' :
        (size / unit > 1 ?
            (size / unit).toFixed(1) + ' KB' :
            size.toFixed(1) + ' Bytes'
        );
};

export const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }).replace('$', '');
};

export const getRange = (current, total, expand = 2, step = 1) => {
    const range = [];
    let startPage = 1;
    let endPage = total;

    if (current - expand > 1) {
        startPage = current - expand
        if (total - current < expand) {
            startPage -= (expand - (total - current));
            if (startPage < 1) startPage = 1;
        }
    }

    if (total - current > expand) {
        endPage = current + expand;
        if (current - expand <= 0) {
            endPage += 1 - (current - expand);

            if (endPage > total) endPage = total;
        }
    }

    while (startPage <= endPage) {
        range.push(startPage);
        startPage += step;
    }
    console.log(range);
    return range;
};

export const isValidPosition = position => {
    return position && position.length === 2 && !isNaN(position[0]) && !isNaN(position[1]);
};

export const getTimestamp = date => {
    if (date) {
        const dateParts = date.split('/');
        const dateInstance = new Date(`${dateParts[1]}-${dateParts[0]}`);
        return dateInstance.getTime();
    }
    return 0;
};

export const convertDate = (timestamp, format) => {
    const date = new Date(timestamp);

    return moment(date).format(format);
};

export const hidingCardNumber = cardNo => {
    const cardNumber = (cardNo || '').trim().replace(/\s+/g, "");
    const firstPart = cardNumber.slice(0, 4);
    const lastPart = cardNumber.slice(cardNumber.length - 4, cardNumber.length);
    const hidingPartCount = cardNumber.length - 8;

    return `${firstPart}${hidingPartCount > 0 ? Array(hidingPartCount).fill('x').join('') : ''}${lastPart}`;
};

export const getRole = role => (role || '').toLowerCase();

export const verifyRole = (userRole, memberRole) => {
    let hasPermission = false;
    const userRoleFormatted = getRole(userRole);
    const memberRoleFormatted = getRole(memberRole);

    if (memberRoleFormatted === OWNER) return false;

    switch (userRoleFormatted) {
        case OWNER:
            hasPermission = true;
            break;
        case ADMIN:
            hasPermission = memberRoleFormatted !== OWNER;
            break;
        case MEMBER:
            hasPermission = memberRoleFormatted === MEMBER;
            break;
        default:
    }

    return hasPermission;
};

export const getRoleList = (userRole, isDisabled = true) => {
    const userRoleFormatted = getRole(userRole);

    switch (userRoleFormatted) {
        case ADMIN:
            return roleList.slice(1, roleList.length);
        case MEMBER:
            return isDisabled ? roleList : roleList.slice(2, roleList.length);
        case OWNER:
        default:
            return roleList;
    }
};

export const dateTimestampConverter = 1000 * 60 * 60 * 24;

export const trimArrayItems = arr => {
    return arr.map(a => a.trim()).filter(a => a);
};

export const getBase64Mime = base64 => {
    let mime = null;

    if (typeof base64 !== 'string') return mime;

    const mimeInspect = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mimeInspect && mimeInspect.length) mime = mimeInspect[1];

    return mime;
};

export const getMimeFileExtension = mime => {
    let extension = null;

    if (typeof extension === 'string') return extension;

    const mimeInspect = mime.split('/');

    if (mimeInspect.length === 2) extension = mimeInspect[1];

    return extension;
}

export const getUnixTimestamp = () => {
    return ( new Date().getTime() / 1000);
}

export const camelCaseKeys = (obj) => {
    if (!_.isObject(obj)) {
        return obj;
    } else if (_.isArray(obj)) {
        return obj.map((v) => camelCaseKeys(v));
    }
    return _.reduce(obj, (r, v, k) => {
        return {
            ...r,
            [_.camelCase(k)]: camelCaseKeys(v)
        };
    }, {});
};
