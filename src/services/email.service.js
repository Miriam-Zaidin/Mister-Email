import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getNextId
}

const STORAGE_KEY = 'emails'
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Miriam Shaparinsky'
}

_createEmails()

const defaultFilter = {
    status: 'inbox',
    txt: '',
    isRead: null
}

function getDefaultFilter() {
    return defaultFilter
}

async function query(filterBy = defaultFilterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    const { status, txt, isRead } = filterBy
    if (status) {
        switch (status) {
            case 'inbox':
                emails = emails.filter(email => email.to === loggedInUser.email)
                break;
            case 'sent':
                emails = emails.filter(email => email.from === loggedInUser.email)
                break;
            case 'star':
                emails = emails.filter(email => email.isStarred)
                break;
            case 'trash':
                emails = emails.filter(email => email.removedAt)
                break;
            default:
                console.log('Conflict: query emails status Invalid :', status)
                break;
        }
    }
    if (txt)
        emails = emails.filter(email => email.body.toLowerCase().includes(txt.toLowerCase()) ||
            email.subject.toLowerCase().includes(txt.toLowerCase()));

    if (isRead !== null)
        emails = emails.filter(email => email.isRead === isRead)

    return emails
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function getNextId(id) {
    // not complited
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
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
