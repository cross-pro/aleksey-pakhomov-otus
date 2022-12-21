'use strict'

/**
 * Module dependencies.
 * @private
 */

let cookie = require("cookie")
let signature = require("cookie-signature")

/**
 * Module exports.
 * @public
 */

module.exports = cookieParser
module.exports.JSONCookie = JSONCookie
module.exports.JSONCookies = JSONCookies
module.exports.signedCookie = signedCookie
module.exports.signedCookies = signedCookies


/**
 * Parse Cookie header and populate `req.cookies`
 * with an object keyed by the cookie names.
 *
 * @param {string|array} [secret] A string (or array of strings) representing cookie signing secret(s).
 * @param {Object} [options]
 * @return {Function}
 * @public
 */


type Req = {
    cookies: object
    secret: any
    headers: any
    signedCookies: any
}

type Res = {}

function cookieParser(secret: string | Array<string>, options: unknown) {
    let secrets = !secret || Array.isArray(secret)
        ? (secret || [])
        : [secret]

    return function cookieParser(req: Req, res: Res, next: any): any {
        if (req.cookies) {
            return next()
        }

        let cookies = req.headers.cookie

        req.secret = secrets[0]
        req.cookies = Object.create(null)
        req.signedCookies = Object.create(null)

        // no cookies
        if (!cookies) {
            return next()
        }

        req.cookies = cookie.parse(cookies, options)

        // parse signed cookies
        if (secrets.length !== 0) {
            req.signedCookies = signedCookies(req.cookies, secrets)
            req.signedCookies = JSONCookies(req.signedCookies)
        }

        // parse JSON cookies
        req.cookies = JSONCookies(req.cookies)

        next()
    }
}

/**
 * Parse JSON cookie string.
 *
 * @param {String} str
 * @return {Object} Parsed object or undefined if not json cookie
 * @public
 */

function JSONCookie(str: string): object | undefined {
    if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
        return undefined
    }

    try {
        return JSON.parse(str.slice(2))
    } catch (err) {
        return undefined
    }
}

/**
 * Parse JSON cookies.
 *
 * @param {Object} obj
 * @return {Object}
 * @public
 */

function JSONCookies(obj: any): object {
    let cookies: Array<string> = Object.keys(obj)
    let key
    let val

    for (let i = 0; i < cookies.length; i++) {
        key = cookies[i]
        val = JSONCookie(obj[key])

        if (val) {
            obj[key] = val
        }
    }

    return obj
}

/**
 * Parse a signed cookie string, return the decoded value.
 *
 * @param {String} str signed cookie string
 * @param {string|array} secret
 * @return {String} decoded value
 * @public
 */

function signedCookie(str: string, secret: string | Array<string>): string | undefined | boolean {
    if (typeof str !== 'string') {
        return undefined
    }

    if (str.substr(0, 2) !== 's:') {
        return str
    }

    let secrets: string | Array<string> = !secret || Array.isArray(secret)
        ? (secret || [])
        : [secret]

    for (let i: number = 0; i < secrets.length; i++) {
        let val: string | boolean = signature.unsign(str.slice(2), secrets[i])

        if (val !== false) {
            return val
        }
    }

    return false
}

/**
 * Parse signed cookies, returning an object containing the decoded key/value
 * pairs, while removing the signed key from obj.
 *
 * @param {Object} obj
 * @param {string|array} secret
 * @return {Object}
 * @public
 */

function signedCookies(obj: any, secret: string | Array<string>): object {
    let cookies: Array<string> = Object.keys(obj)
    let dec: string | undefined | boolean
    let key: string
    let ret: any = Object.create(null)
    let val: string

    for (let i: number = 0; i < cookies.length; i++) {
        key = cookies[i]
        val = obj[key]
        dec = signedCookie(val, secret)

        if (val !== dec) {
            ret[key] = dec
            delete obj[key]
        }
    }

    return ret
}
