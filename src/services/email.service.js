import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
}

const STORAGE_KEY = 'emails'
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Miriam Shaparinsky'
}

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
        maxBatteryStatus = maxBatteryStatus || Infinity
        minBatteryStatus = minBatteryStatus || 0
        emails = emails.filter(email => email.type.toLowerCase().includes(type.toLowerCase()) && email.model.toLowerCase().includes(model.toLowerCase())
            && (email.batteryStatus < maxBatteryStatus)
            && email.batteryStatus > minBatteryStatus)
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    console.log("id:", id);
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave['isRead'] = false
        emailToSave['isStarred'] = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', isRead = false, isStarred = false, sentAt = 1551133930594, removedAt = null, from = 'momo@momo.com', to = 'user@appsus.com') {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e2', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'momo@momo.com', to: 'user@appsus.com' },
            { id: 'e3', subject: 'Hi!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'momo@momo.com', to: 'user@appsus.com' },
            { id: 'e1', subject: 'Hello!', body: 'Would love to catch up sometimes', isRead: false, isStarred: true, sentAt: 1551133930594, removedAt: null, from: 'momo@momo.com', to: 'user@appsus.com' },
            { id: 'e4', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'momo@momo.com', to: 'user@appsus.com' }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}
