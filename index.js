const https = require('node:https')

class API {
    /**
     * @private
     */
    keys = {
        publisher: '',
        user: ''
    }
    /**
     * @private
     */
    error = true
    /**
     * @param {string} url
     * @param {object} options
     * @param {'GET'|'POST'} method
     * @param {boolean} service
     * @param {'publisher'|'user'} [auth]
     * @private
     */
    request = (url, options, method, service, auth) => {
        if (service) url += `?${auth ? `key=${this.keys[auth]}&` : ''}input_json=${encodeURIComponent(JSON.stringify(options))}`
        else {
            options = Object.assign(options, auth ? { key: this.keys[auth] } : {})
            const keys = Object.keys(options)

            url += [
                '',
                `?${keys[0]}=${Object.values(options)[0]}`,
                `?${keys[0]}=${Object.values(options)[0]}${keys.slice(1).map(key => `&${key}=${options[key]}`).join('')}`
            ][Math.max(keys.length, 2)]
        }
        
        return new Promise(resolve => https.request(url, { method }, res => {
            let info = ''
            res.on('data', data => info += data)
            res.on('end', () => {
                if (info.startsWith('<')) {
                    if (this.error) throw new Error(`\u001B[31mInvalid API Response \u001B[35m(${info.match(/<title>(.*?)<\/title>/)[1]})\n\u001B[33m${info.match(/<body>(.*?)<\/body>/)[0].replace(/(<pre>|<\/pre>)/ig, '"').replace( /(<([^>]+)>)/ig, ' ').slice(info.match(/<title>(.*?)<\/title>/)[1].length + 3)}\u001B[0m`)
                    else resolve(info)
                } else resolve(JSON.parse(info))
            })
        }).end())
    }
    /**
     * @param {object} keys
     * @param {string} [keys.publisher]
     * @param {string} [keys.user] 
     * @param {boolean} [error]
     */
    constructor (keys = {}, error = true) {
        this.keys = Object.assign(this.keys, keys)
        this.error = error
    }
    /**
     * @param {number} steamid The Steam ID of the user who is being reported for cheating.
     * @param {number} appid The App ID for the game.
     * @param {number} [steamidreporter] The Steam ID of the user or game server who is reporting the cheating.
     * @param {number} [appdata] App specific data about the type of cheating set by developer. (ex 1 = Aimbot, 2 = Wallhack, 3 = Griefing)
     * @param {boolean} [heuristic] Extra information about the source of the cheating - was it a heuristic.
     * @param {boolean} [detection] Extra information about the source of the cheating - was it a detection.
     * @param {boolean} [playerreport] Extra information about the source of the cheating - was it a player report.
     * @param {boolean} [noreportid] Don't return reportid. This should only be passed if you don't intend to issue a ban based on this report.
     * @param {number} [gamemode] Extra information about state of game - was it a specific type of game play or game mode. (0 = generic)
     * @param {number} [suspicionstarttime] Extra information indicating how far back the game thinks is interesting for this user. Unix epoch time (time since Jan 1st, 1970).
     * @param {number} [severity] Level of severity of bad action being reported. Scale set by developer.
     */
    reportPlayerCheating = (steamid, appid, steamidreporter, appdata, heuristic, detection, playerreport, noreportid, gamemode, suspicionstarttime, severity) => this.request('https://partner.steam-api.com/ICheatReportingService/ReportPlayerCheating/v1/', { steamid, appid, steamidreporter, appdata, heuristic, detection, playerreport, noreportid, gamemode, suspicionstarttime, severity }, 'POST', true, 'publisher')
    /**
     * @param {number} steamid Steam ID of the user who is reported as cheating.
     * @param {number} appid The appid of the game.
     * @param {number} reportid The reportid originally used to report cheating.
     * @param {string} cheatdescription Text describing cheating infraction.
     * @param {number} duration Ban duration requested in seconds. (duration 0 will issue infinite - less than a year is a suspension and not visible on profile)
     * @param {boolean} delayban Delay the ban according to default ban delay rules.
     * @param {number} flags Additional information about the ban request. (Unused)
     */
    requestPlayerGameBan = (steamid, appid, reportid, cheatdescription, duration, delayban, flags) => this.request('https://partner.steam-api.com/ICheatReportingService/RequestPlayerGameBan/v1/', { steamid, appid, reportid, cheatdescription, duration, delayban, flags }, 'POST', true, 'publisher')
    /**
     * @param {number} steamid The Steam ID of the user to remove the game ban on.
     * @param {number} appid The App ID of the game.
     */
    removePlayerGameBan = (steamid, appid) => this.request('https://partner.steam-api.com/ICheatReportingService/RemovePlayerGameBan/v1/', { steamid, appid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid The App ID for the game.
     * @param {number} timeend The end of the time range. Formatted as Unix epoch time (time since Jan 1st, 1970).
     * @param {number} timebegin The beginning of the time range. Formatted as Unix epoch time (time since Jan 1st, 1970).
     * @param {number} reportidmin Minimum reportID to include. (can pass 0 - end of previous report range)
     * @param {boolean} includereports Include reports. If false includebans must be true.
     * @param {boolean} includebans Include ban requests? If false includereports must be true.
     * @param {number} steamid Query just for this Steam ID.
     */
    getCheatingReports = (appid, timeend, timebegin, reportidmin, includereports, includebans, steamid) => this.request('https://partner.steam-api.com/ICheatReportingService/GetCheatingReports/v1/', { appid, timeend, timebegin, reportidmin, includereports, includebans, steamid }, 'GET', true, 'publisher')
    /**
     * @param {number} steamid Steam ID of the user running and reporting the cheat.
     * @param {number} appid The App ID of the game.
     * @param {string} pathandfilename Path and file name of the cheat executable.
     * @param {string} webcheaturl Web url where the cheat was found and downloaded.
     * @param {number} time_now Local system time now. 64 bit windows system time.
     * @param {number} time_started Local system time when cheat process started. ( 0 if not yet run ) 64 bit windows system time.
     * @param {number} time_stopped Local system time when cheat process stopped. ( 0 if still running ) 64 bit windows system time.
     * @param {string} cheatname Descriptive name for the cheat.
     * @param {number} game_process_id Process ID of the running game.
     * @param {number} cheat_process_id Process ID of the cheat process that ran.
     * @param {number} cheat_param_1 Extra cheat data.
     * @param {number} cheat_param_2 Extra cheat data.
     */
    reportCheatData = (steamid, appid, pathandfilename, webcheaturl, time_now, time_started, time_stopped, cheatname, game_process_id, cheat_process_id, cheat_param_1, cheat_param_2) => this.request('https://api.steampowered.com/ICheatReportingService/ReportCheatData/v1/', { steamid, appid, pathandfilename, webcheaturl, time_now, time_started, time_stopped, cheatname, game_process_id, cheat_process_id, cheat_param_1, cheat_param_2 }, 'POST', true, 'user')
    /**
     * @param {number} steamid The Steam ID of the user.
     * @param {number} appid The App ID of the game the user is playing.
     * @param {number} [session_id] The Session ID that was obtained from the call to StartSecureMultiplayerSession.
     */
    requestVacStatusForUser = (steamid, appid, session_id) => this.request('https://partner.steam-api.com/ICheatReportingService/RequestVacStatusForUser/v1/', { steamid, appid, session_id }, 'POST', true, 'publisher')
    /**
     * @param {number} steamid steamid of the user.
     * @param {number} appid The App ID of the game.
     */
    startSecureMultiplayerSession = (steamid, appid) => this.request('https://partner.steam-api.com/ICheatReportingService/StartSecureMultiplayerSession/v1/', { steamid, appid }, 'POST', true, 'publisher')
    /**
     * @param {number} steamid steamid of the user.
     * @param {number} appid The App ID of the game.
     * @param {number} session_id The Session ID that was obtained from the call to StartSecureMultiplayerSession.
     */
    endSecureMultiplayerSession = (steamid, appid, session_id) => this.request('https://partner.steam-api.com/ICheatReportingService/EndSecureMultiplayerSession/v1/', { steamid, appid, session_id }, 'POST', true, 'publisher')
    /**
     * @param {number} [appid] same app id
     * @param {number} [ugcid] unique file ID
     * @param {string} [filename] the file name
     * @param {number} [timestamp] epoch time when the file was last modified
     * @param {number} [file_size] size of the file in bytes
     * @param {string} [url] a URL which can be used to download the file
     * @param {number} [steamid_creator] SteamID of the user
     * @param {number} [flags] Steam internal use only
     * @param {string} [platforms_to_sync] List of platforms for which this file is valid. See Uploading Files for the list of possible values.
     * @param {string} [file_sha] Hex string (40 digits) representing the SHA1 digest of the file.
     */
    enumerateUserFiles = (appid, ugcid, filename, timestamp, file_size, url, steamid_creator, flags, platforms_to_sync, file_sha) => this.request('https://api.steampowered.com/ICloudService/EnumerateUserFiles/v1/?access_token=<token>&appid=1234&extended_details=1', { appid, ugcid, filename, timestamp, file_size, url, steamid_creator, flags, platforms_to_sync, file_sha }, 'GET', false)
    /**
     * @param {string} access_token OAuth access token for the user
     * @param {number} appid Your App ID
     * @param {number} batch_id The ID number of this batch
     * @param {number} batch_eresult Result of the batch (see remarks)
     */
    completeAppUploadBatch = (access_token, appid, batch_id, batch_eresult) => this.request('https://api.steampowered.com/ICloudService/CompleteAppUploadBatch/v1/', { access_token, appid, batch_id, batch_eresult }, 'POST', false)
    /**
     * @param {string} [name] the header name
     * @param {string} [value] the header value
     */
    beginHTTPUpload = (name, value) => this.request('https://steamcloud-us-west1.storage.googleapis.com/00/00/00/00/1234/012_3_4A77D494_9D267_1464.dat?GoogleAccessId=numbersandletters@developer.gserviceaccount.com&Expires=1595961837&Signature=morestuffhere', { name, value }, 'PUT', true)
    /**
     * @param {string} access_token OAuth access token for the user
     * @param {number} appid Your App ID
     * @param {boolean} transfer_succeeded true if the PUT request succeeded
     * @param {string} filename the file name
     * @param {string} file_sha Hex string (40 digits) representing the SHA1 digest of the file.
     */
    commitHTTPUpload = (access_token, appid, transfer_succeeded, filename, file_sha) => this.request('https://api.steampowered.com/ICloudService/CommitHTTPUpload/v1/', { access_token, appid, transfer_succeeded, filename, file_sha }, 'POST', false)
    /**
     * @param {string} access_token OAuth access token for the user
     * @param {number} appid Your App ID
     * @param {string} filename filename of the file to delete
     */
    delete = (access_token, appid, filename) => this.request('https://api.steampowered.com/ICloudService/Delete/v1/', { access_token, appid, filename }, 'POST', false)
    /**
     * @param {number} steamid The SteamID of the user to check
     */
    getMarketEligibility = (steamid) => this.request('https://partner.steam-api.com/IEconMarketService/GetMarketEligibility/v1/', { steamid }, 'GET', true, 'publisher')
    /**
     * @param {number} appid The app making the request
     * @param {number} steamid The SteamID of the user whose listings should be canceled
     * @param {boolean} synchronous Whether or not to wait until all listings have been canceled before returning the response
     */
    cancelAppListingsForUser = (appid, steamid, synchronous) => this.request('https://partner.steam-api.com/IEconMarketService/CancelAppListingsForUser/v1/', { appid, steamid, synchronous }, 'POST', true, 'publisher')
    /**
     * @param {number} appid The app that's asking. Must match the app of the listing and must belong to the publisher group that owns the API key making the request
     * @param {number} listingid The identifier of the listing to get information for
     */
    getAssetID = (appid, listingid) => this.request('https://partner.steam-api.com/IEconMarketService/GetAssetID/v1/', { appid, listingid }, 'GET', true, 'publisher')
    /**
     * @param {string} language The language to use in item descriptions
     * @param {number} start The result number to start at
     * @param {number} filter_appid If present, the app ID to limit results to
     * @param {number} ecurrency If present, prices returned will be represented in this currency
     * @param {number} [rows] Number of rows per page
     */
    getPopular = (language, start, filter_appid, ecurrency, rows) => this.request('https://partner.steam-api.com/IEconMarketService/GetPopular/v1/', { language, start, filter_appid, ecurrency, rows }, 'GET', true, 'publisher')
    /**
     * @param {number} max_trades The number of trades to return information for
     * @param {number} start_after_time The time of the last trade shown on the previous page of results, or the time of the first trade if navigating back
     * @param {number} start_after_tradeid The tradeid shown on the previous page of results, or the ID of the first trade if navigating back
     * @param {boolean} navigating_back The user wants the previous page of results, so return the previous max_trades trades before the start time and ID
     * @param {boolean} get_descriptions If set, the item display data for the items included in the returned trades will also be returned
     * @param {string} language The language to use when loading item display data
     * @param {boolean} include_failed 
     * @param {boolean} include_total If set, the total number of trades the account has participated in will be included in the response
     */
    getTradeHistory = (max_trades, start_after_time, start_after_tradeid, navigating_back, get_descriptions, language, include_failed, include_total) => this.request('https://api.steampowered.com/IEconService/GetTradeHistory/v1/', { max_trades, start_after_time, start_after_tradeid, navigating_back, get_descriptions, language, include_failed, include_total }, 'GET', true, 'user')
    /**
     * @param {number} steamid User to clear cache for.
     * @param {number} appid App to clear cache for.
     * @param {number} contextid Context to clear cache for.
     */
    flushInventoryCache = (steamid, appid, contextid) => this.request('https://partner.steam-api.com/IEconService/FlushInventoryCache/v1/', { steamid, appid, contextid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid 
     */
    flushAssetAppearanceCache = (appid) => this.request('https://partner.steam-api.com/IEconService/FlushAssetAppearanceCache/v1/', { appid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid 
     */
    flushContextCache = (appid) => this.request('https://partner.steam-api.com/IEconService/FlushContextCache/v1/', { appid }, 'POST', true, 'publisher')
    /**
     * @param {boolean} get_sent_offers Request the list of sent offers.
     * @param {boolean} get_received_offers Request the list of received offers.
     * @param {boolean} get_descriptions If set, the item display data for the items included in the returned trade offers will also be returned.
     * @param {string} language The language to use when loading item display data.
     * @param {boolean} active_only Indicates we should only return offers which are still active, or offers that have changed in state since the time_historical_cutoff
     * @param {boolean} historical_only Indicates we should only return offers which are not active.
     * @param {number} time_historical_cutoff When active_only is set, offers updated since this time will also be returned
     */
    getTradeOffers = (get_sent_offers, get_received_offers, get_descriptions, language, active_only, historical_only, time_historical_cutoff) => this.request('https://api.steampowered.com/IEconService/GetTradeOffers/v1/', { get_sent_offers, get_received_offers, get_descriptions, language, active_only, historical_only, time_historical_cutoff }, 'GET', true, 'user')
    /**
     * @param {number} tradeofferid 
     * @param {string} language 
     */
    getTradeOffer = (tradeofferid, language) => this.request('https://api.steampowered.com/IEconService/GetTradeOffer/v1/', { tradeofferid, language }, 'GET', true, 'user')
    /**
     * @param {number} time_last_visit The time the user last visited. If not passed, will use the time the user last visited the trade offer page.
     */
    getTradeOffersSummary = (time_last_visit) => this.request('https://api.steampowered.com/IEconService/GetTradeOffersSummary/v1/', { time_last_visit }, 'GET', true, 'user')
    /**
     * @param {string} key Steamworks Web API publisher authentication key.
     * @param {number} appid appid of game
     * @param {number} steamid The steam ID of the account to operate on
     * @param {string} command The command to run on that asset
     * @param {number} contextid The context to fetch history for
     * @param {string} args The arguments that were provided with the command in the first place
     */
    getHistoryCommandDetails = (key, appid, steamid, command, contextid, args) => this.request('https://partner.steam-api.com/IGameInventory/GetHistoryCommandDetails/v1/', { key, appid, steamid, command, contextid, arguments: args }, 'GET', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {number} steamid The Steam ID to fetch history for
     * @param {number} contextid The context to fetch history for
     * @param {number} starttime Start time of the history range to collect
     * @param {number} endtime End time of the history range to collect
     */
    getUserHistory = (appid, steamid, contextid, starttime, endtime) => this.request('https://partner.steam-api.com/IGameInventory/GetUserHistory/v1/', { appid, steamid, contextid, starttime, endtime }, 'GET', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {number} steamid The asset ID to operate on
     * @param {number} contextid The context to fetch history for
     * @param {number} actorid A unique 32 bit ID for the support person executing the command
     */
    historyExecuteCommands = (appid, steamid, contextid, actorid) => this.request('https://partner.steam-api.com/IGameInventory/HistoryExecuteCommands/v1/', { appid, steamid, contextid, actorid }, 'POST', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {number} assetid The asset ID to operate on
     * @param {number} contextid The context to fetch history for
     */
    supportGetAssetHistory = (appid, assetid, contextid) => this.request('https://partner.steam-api.com/IGameInventory/SupportGetAssetHistory/v1/', { appid, assetid, contextid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {object[]} itemdefs One or more Item Definitions, presented as a JSON array, to be updated or created.
     */
    updateItemDefs = (appid, itemdefs) => this.request('https://partner.steam-api.com/IGameInventory/UpdateItemDefs/v0001', { appid, itemdefs }, 'POST', false, 'publisher')
    /**
     * @param {number} appid The App ID to create the session for.
     * @param {number} context Game-specified context value the game can use to associate the session with some object on their backend.
     * @param {string} title The title of the session to be displayed within each user's list of sessions.
     * @param {string} users The initial state of all users in the session.
     * @param {number} [steamid] Steam ID to make the request on behalf of -- if specified, the user must be in the session and all users being added to the session must be friends with the user.
     */
    createSession = (appid, context, title, users, steamid) => this.request('https://partner.steam-api.com/IGameNotificationsService/CreateSession/v1/', { appid, context, title, users, steamid }, 'POST', true, 'publisher')
    /**
     * @param {number} sessionid The sessionid to update.
     * @param {number} appid The App ID of the session to update.
     * @param {string} title The new title of the session. If not specified, the title will not be changed.
     * @param {string} users A list of users whose state will be updated to reflect the given state. If the users are not already in the session, they will be added to it.
     * @param {number} steamid Steam ID to make the request on behalf of -- if specified, the user must be in the session.
     */
    updateSession = (sessionid, appid, title, users, steamid) => this.request('https://partner.steam-api.com/IGameNotificationsService/UpdateSession/v1/', { sessionid, appid, title, users, steamid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid The sessionid to request details for. Optional. If not specified, all the user's sessions will be returned.
     * @param {number} steamid The user whose sessions are to be enumerated.
     * @param {boolean} include_all_user_messages Set whether the message for all users should be included. Defaults to false.
     * @param {boolean} include_auth_user_message Set whether the message for the authenticated user should be included. Defaults to false.
     * @param {string} language Language to localize the text in.
     */
    enumerateSessionsForApp = (appid, steamid, include_all_user_messages, include_auth_user_message, language) => this.request('https://partner.steam-api.com/IGameNotificationsService/EnumerateSessionsForApp/v1/', { appid, steamid, include_all_user_messages, include_auth_user_message, language }, 'GET', true, 'publisher')
    /**
     * @param {string} sessions The session(s) to receive the details for
     * @param {number} appid The appid for the sessions.
     * @param {string} language Language to localize the text in.
     */
    getSessionDetailsForApp = (sessions, appid, language) => this.request('https://partner.steam-api.com/IGameNotificationsService/GetSessionDetailsForApp/v1/', { sessions, appid, language }, 'GET', true, 'publisher')
    /**
     * @param {number} steamid The Steam ID to request notifications for.
     * @param {number} appid The App ID to request notifications for.
     */
    requestNotifications = (steamid, appid) => this.request('https://partner.steam-api.com/IGameNotificationsService/RequestNotifications/v1/', { steamid, appid }, 'POST', true, 'publisher')
    /**
     * @param {number} sessionid The sessionid to delete.
     * @param {number} appid The App ID of the session to delete.
     * @param {number} steamid Steam ID to make the request on behalf of -- if specified, the user must be in the session.
     */
    deleteSession = (sessionid, appid, steamid) => this.request('https://partner.steam-api.com/IGameNotificationsService/DeleteSession/v1/', { sessionid, appid, steamid }, 'POST', true, 'publisher')
    /**
     * @param {number} sessionid The sessionid to delete.
     * @param {number} appid The appid of the session to delete.
     */
    deleteSessionBatch = (sessionid, appid) => this.request('https://partner.steam-api.com/IGameNotificationsService/DeleteSessionBatch/v1/', { sessionid, appid }, 'POST', true, 'publisher')
    /**
    
     */
    getAccountList = () => this.request('https://api.steampowered.com/IGameServersService/GetAccountList/v1/', {}, 'GET', true, 'user')
    /**
     * @param {number} appid The app to use the account for
     * @param {string} memo The memo to set on the new account
     */
    createAccount = (appid, memo) => this.request('https://api.steampowered.com/IGameServersService/CreateAccount/v1/', { appid, memo }, 'POST', true, 'user')
    /**
     * @param {number} steamid The SteamID of the game server to set the memo on
     * @param {string} memo The memo to set on the new account
     */
    setMemo = (steamid, memo) => this.request('https://api.steampowered.com/IGameServersService/SetMemo/v1/', { steamid, memo }, 'POST', true, 'user')
    /**
     * @param {number} steamid The SteamID of the game server to reset the login token of
     */
    resetLoginToken = (steamid) => this.request('https://api.steampowered.com/IGameServersService/ResetLoginToken/v1/', { steamid }, 'POST', true, 'user')
    /**
     * @param {number} steamid The SteamID of the game server account to delete
     */
    deleteAccount = (steamid) => this.request('https://api.steampowered.com/IGameServersService/DeleteAccount/v1/', { steamid }, 'POST', true, 'user')
    /**
     * @param {number} steamid The SteamID of the game server to get info on
     */
    getAccountPublicInfo = (steamid) => this.request('https://api.steampowered.com/IGameServersService/GetAccountPublicInfo/v1/', { steamid }, 'GET', true, 'user')
    /**
     * @param {string} login_token Login token to query
     */
    queryLoginToken = (login_token) => this.request('https://api.steampowered.com/IGameServersService/QueryLoginToken/v1/', { login_token }, 'GET', true, 'user')
    /**
     * @param {string} server_ips 
     */
    getServerSteamIDsByIP = (server_ips) => this.request('https://api.steampowered.com/IGameServersService/GetServerSteamIDsByIP/v1/', { server_ips }, 'GET', true, 'user')
    /**
     * @param {number} server_steamids 
     */
    getServerIPsBySteamID = (server_steamids) => this.request('https://api.steampowered.com/IGameServersService/GetServerIPsBySteamID/v1/', { server_steamids }, 'GET', true, 'user')
    /**
     * @param {number} appid The ID of the application associated with the item.
     * @param {number} itemdefid List of the itemdefid's to grant. This should be specified as a series of parameters named 'itemdefid[0]', 'itemdefid[1]', etc.
     * @param {string} itempropsjson 
     * @param {number} steamid SteamID of the player to receive the items.
     * @param {boolean} notify Optional, default 0. Set to 1 to indicate the user is not in-game and should see a Steam notification.
     * @param {number} requestid Optional, default 0. Clients may provide a unique identifier for a request to perform at most once execution. When a requestid is resubmitted, it will not cause the work to be performed again; the response message will be the current state of items affected by the original successful execution.
     * @param {boolean} trade_restriction Optional, default 0. Set to 1 to have Steam apply market and trade cooldowns as if this was a purchased item.
     */
    addItem = (appid, itemdefid, itempropsjson, steamid, notify, requestid, trade_restriction) => this.request('https://partner.steam-api.com/IInventoryService/AddItem/v1/', { appid, itemdefid, itempropsjson, steamid, notify, requestid, trade_restriction }, 'POST', true, 'publisher')
    /**
     * @param {number} appid 
     * @param {number} steamid 
     * @param {number} [itemdefid] 
     * @param {boolean} [notify] Should notify the user that the item was added to their Steam Inventory.
     * @param {number} requestid 
     */
    addPromoItem = (appid, steamid, itemdefid, notify, requestid) => this.request('https://partner.steam-api.com/IInventoryService/AddPromoItem/v1/', { appid, steamid, itemdefid, notify, requestid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid 
     * @param {number} itemid Item ID to be consumed
     * @param {string} quantity Amount of the given item stack to be consumed
     * @param {number} steamid 
     * @param {number} requestid Clients may provide a unique identifier for a request to perform at most once execution. When a requestid is resubmitted, it will not cause the work to be performed again; the response message will be the current state of items affected by the original successful execution.
     */
    consumeItem = (appid, itemid, quantity, steamid, requestid) => this.request('https://partner.steam-api.com/IInventoryService/ConsumeItem/v1/', { appid, itemid, quantity, steamid, requestid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid The ID of the application associated with the item.
     * @param {number} steamid SteamID of the player that owns the items.
     * @param {number} materialsitemid The unique ID an item in the player's inventory to be converted to the target item type. This should be provided as materialsitemid[0], materialsitemid[1], etc.
     * @param {number} materialsquantity The quantity of the matching item that should be used in this recipe. This array must be the same length as materialsitemid.
     * @param {number} outputitemdefid The ItemDef of the item to be created.
     */
    exchangeItem = (appid, steamid, materialsitemid, materialsquantity, outputitemdefid) => this.request('https://partner.steam-api.com/IInventoryService/ExchangeItem/v1/', { appid, steamid, materialsitemid, materialsquantity, outputitemdefid }, 'POST', true, 'publisher')
    /**
     * @param {number} appid The ID of the application associated with the item.
     * @param {number} steamid 64-bit Steam ID of the user whose inventory you are requesting.
     */
    getInventory = (appid, steamid) => this.request('https://partner.steam-api.com/IInventoryService/GetInventory/v1/', { appid, steamid }, 'GET', true, 'publisher')
    /**
     * @param {number} appid The ID of the application associated with the item.
     * @param {string} modifiedsince Use to retrieve just updates to the itemdefs since a given time. Format is yyyymmddThhmmssZ (E.g. 20140808T010203Z).
     * @param {number} itemdefids Use to retrieve just specific itemdefs by itemdefid
     * @param {number} workshopids Use to retrieve just specific itemdefs by workshopid
     * @param {number} [cache_max_age_seconds] Allow stale data to be returned for the specified number of seconds.
     */
    getItemDefs = (appid, modifiedsince, itemdefids, workshopids, cache_max_age_seconds) => this.request('https://partner.steam-api.com/IInventoryService/GetItemDefs/v1/', { appid, modifiedsince, itemdefids, workshopids, cache_max_age_seconds }, 'GET', true, 'publisher')
    /**
     * @param {number} ecurrency 
     */
    getPriceSheet = (ecurrency) => this.request('https://api.steampowered.com/IInventoryService/GetPriceSheet/v1/', { ecurrency }, 'GET', true, 'user')
    /**
     * @param {number} appid 
     * @param {number} steamid 
     * @param {number[]} itemdefid 
     * @param {boolean} [force] 
     */
    consolidate = (appid, steamid, itemdefid, force) => this.request('https://partner.steam-api.com/IInventoryService/Consolidate/v1/', { appid, steamid, itemdefid, force }, 'POST', true, 'publisher')
    /**
     * @param {number} appid 
     * @param {number} steamid 
     * @param {number[]} itemdefid List of the itemdefid's to query. This should be specified as a series of parameters named 'itemdefid[0]', 'itemdefid[1]', etc.
     * @param {boolean} [force] 
     */
    getQuantity = (appid, steamid, itemdefid, force) => this.request('https://partner.steam-api.com/IInventoryService/GetQuantity/v1/', { appid, steamid, itemdefid, force }, 'GET', true, 'publisher')
    /**
     * @param {number} itemid The id of the item being modified.
     * @param {string} property_name The name of the dynamic property being added/updated/removed.
     * @param {string} [property_value_string] The string value of the property to set.
     * @param {boolean} [property_value_bool] The boolean value of the property to set.
     * @param {number} [property_value_int] The 64 bit integer value of the property to set.
     * @param {string} [property_value_float] The 32 bit float value of the property to set.
     * @param {boolean} [remove_property] Set to true if the property should be removed.
     */
    modifyItems = (itemid, property_name, property_value_string, property_value_bool, property_value_int, property_value_float, remove_property) => this.request('https://partner.steam-api.com/IInventoryService/ModifyItems/v1/', { itemid, property_name, property_value_string, property_value_bool, property_value_int, property_value_float, remove_property }, 'POST', true)
    /**
     * @param {string} [key_name] Key name
     * @param {string} [key_value] Key value
     */
    createLobby = (key_name, key_value) => this.request('https://partner.steam-api.com/ILobbyMatchmakingService/CreateLobby/v1/', { key_name, key_value }, 'POST', true)
    /**
     * @param {number} appid The ID of the application associated with the lobby.
     * @param {number} steamid_to_remove SteamID of the user to remove. If the user is not online when called, this will remove their reserved slot in the lobby.
     * @param {number} steamid_lobby Lobby ID
     * @param {string} [input_json] Json data. Required for data that cannot be posted parameters, but can also be used for the other parameters
     */
    removeUserFromLobby = (appid, steamid_to_remove, steamid_lobby, input_json) => this.request('https://partner.steam-api.com/ILobbyMatchmakingService/RemoveUserFromLobby/v1/', { appid, steamid_to_remove, steamid_lobby, input_json }, 'POST', true, 'user')
    /**
     * @param {number} appid The ID of the application associated with the lobby.
     * @param {number} steamid_lobby Lobby ID.
     */
    getLobbyData = (appid, steamid_lobby) => this.request('https://partner.steam-api.com/ILobbyMatchmakingService/GetLobbyData/v1/', { appid, steamid_lobby }, 'GET', true, 'user')
    /**
     * @param {number} steamid The player we're asking about
     * @param {number} count The number of games to return (0/unset: all)
     */
    getRecentlyPlayedGames = (steamid, count) => this.request('https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/', { steamid, count }, 'GET', true, 'user')
    /**
     * @param {number} steamid The player we're asking about
     * @param {boolean} include_appinfo true if we want additional details (name, icon) about each game
     * @param {boolean} include_played_free_games Free games are excluded by default. If this is set, free games the user has played will be returned.
     * @param {number} appids_filter if set, restricts result set to the passed in apps
     */
    getOwnedGames = (steamid, include_appinfo, include_played_free_games, appids_filter) => this.request('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/', { steamid, include_appinfo, include_played_free_games, appids_filter }, 'GET', true, 'user')
    /**
     * @param {number} steamid The player we're asking about
     */
    getSteamLevel = (steamid) => this.request('https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/', { steamid }, 'GET', true, 'user')
    /**
     * @param {number} steamid The player we're asking about
     */
    getBadges = (steamid) => this.request('https://api.steampowered.com/IPlayerService/GetBadges/v1/', { steamid }, 'GET', true, 'user')
    /**
     * @param {number} steamid The player we're asking about
     * @param {number} badgeid The badge we're asking about
     */
    getCommunityBadgeProgress = (steamid, badgeid) => this.request('https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/', { steamid, badgeid }, 'GET', true, 'user')
    /**
     * @param {number} query_type IPublishedFileService#EPublishedFileQueryType
     * @param {number} page Current page. Currently there is an upper limit of 1000.
     * @param {string} cursor Cursor to paginate through the results (set to '*' for the first request). Prefer this over using the page parameter, as it will allow you to do deep pagination. When used, the page parameter will be ignored. Use the "next_cursor" value returned in the response to set up the next query to get the next set of results.
     * @param {number} creator_appid App that created the files
     * @param {number} appid App that consumes the files
     * @param {string} requiredtags Tags to match on. See match_all_tags parameter below
     * @param {string} excludedtags Tags that must NOT be present on a published file to satisfy the query.
     * @param {string} required_flags Required flags that must be set on any returned items
     * @param {string} omitted_flags Flags that must not be set on any returned items
     * @param {string} search_text Text to match in the item's title or description
     * @param {number} filetype IPublishedFileService#EPublishedFileInfoMatchingFileType
     * @param {number} child_publishedfileid Find all items that reference the given item.
     * @param {number} days If query_type is k_PublishedFileQueryType_RankedByTrend, then this is the number of days to get votes for [1,7].
     * @param {boolean} include_recent_votes_only If query_type is k_PublishedFileQueryType_RankedByTrend, then limit result set just to items that have votes within the day range given
     * @param {string} required_kv_tags Required key-value tags to match on.
     * @param {boolean} totalonly If true, only return the total number of files that satisfy this query.
     * @param {boolean} ids_only If true, only return the published file ids of files that satisfy this query.
     * @param {boolean} return_vote_data Return vote data
     * @param {boolean} return_tags Return tags in the file details
     * @param {boolean} return_kv_tags Return key-value tags in the file details
     * @param {boolean} return_previews Return preview image and video details in the file details
     * @param {boolean} return_children Return child item ids in the file details
     * @param {boolean} return_short_description Populate the short_description field instead of file_description
     * @param {boolean} return_for_sale_data Return pricing information, if applicable
     * @param {number} return_playtime_stats Return playtime stats for the specified number of days before today.
     * @param {number} [numperpage] The number of results, per page to return.
     * @param {boolean} [match_all_tags] If true, then items must have all the tags specified, otherwise they must have at least one of the tags.
     * @param {number} [cache_max_age_seconds] Allow stale data to be returned for the specified number of seconds.
     * @param {number} [language] Language to search in and also what gets returned. Defaults to English.
     * @param {boolean} [return_metadata] Populate the metadata
     */
    queryFiles = (query_type, page, cursor, creator_appid, appid, requiredtags, excludedtags, required_flags, omitted_flags, search_text, filetype, child_publishedfileid, days, include_recent_votes_only, required_kv_tags, totalonly, ids_only, return_vote_data, return_tags, return_kv_tags, return_previews, return_children, return_short_description, return_for_sale_data, return_playtime_stats, numperpage, match_all_tags, cache_max_age_seconds, language, return_metadata) => this.request('https://api.steampowered.com/IPublishedFileService/QueryFiles/v1/', { query_type, page, cursor, creator_appid, appid, requiredtags, excludedtags, required_flags, omitted_flags, search_text, filetype, child_publishedfileid, days, include_recent_votes_only, required_kv_tags, totalonly, ids_only, return_vote_data, return_tags, return_kv_tags, return_previews, return_children, return_short_description, return_for_sale_data, return_playtime_stats, numperpage, match_all_tags, cache_max_age_seconds, language, return_metadata }, 'GET', true, 'user')
    /**
     * @param {number} publishedfileid 
     * @param {number} appid 
     * @param {string} metadata 
     */
    setDeveloperMetadata = (publishedfileid, appid, metadata) => this.request('https://partner.steam-api.com/IPublishedFileService/SetDeveloperMetadata/v1/', { publishedfileid, appid, metadata }, 'POST', true, 'publisher')
    /**
     * @param {number} steamid SteamID of the user
     * @param {number} appid 
     * @param {number} expiration_time Unix timestamp when the ban expires, 0 to remove
     * @param {string} [reason] Reason the user was banned. Will be displayed to the user.
     */
    updateAppUGCBan = (steamid, appid, expiration_time, reason) => this.request('https://partner.steam-api.com/IPublishedFileService/UpdateAppUGCBan/v1/', { steamid, appid, expiration_time, reason }, 'POST', true, 'publisher')
    /**
     * @param {number} publishedfileid 
     * @param {number} appid 
     * @param {boolean} banned 
     * @param {string} reason Reason why the item was banned. Only visible to admins.
     */
    updateBanStatus = (publishedfileid, appid, banned, reason) => this.request('https://partner.steam-api.com/IPublishedFileService/UpdateBanStatus/v1/', { publishedfileid, appid, banned, reason }, 'POST', true, 'publisher')
    /**
     * @param {number} publishedfileid 
     * @param {number} appid 
     * @param {boolean} incompatible 
     */
    updateIncompatibleStatus = (publishedfileid, appid, incompatible) => this.request('https://partner.steam-api.com/IPublishedFileService/UpdateIncompatibleStatus/v1/', { publishedfileid, appid, incompatible }, 'POST', true, 'publisher')
    /**
     * @param {number} publishedfileid 
     * @param {number} appid 
     * @param {string} [add_tags] Tags to add
     * @param {string} [remove_tags] Tags to remove
     */
    updateTags = (publishedfileid, appid, add_tags, remove_tags) => this.request('https://partner.steam-api.com/IPublishedFileService/UpdateTags/v1/', { publishedfileid, appid, add_tags, remove_tags }, 'POST', true, 'publisher')
    /**
     * @param {number} [siteid] Site ID to see; zero for all sites
     */
    getCurrentClientConnections = (siteid) => this.request('https://api.steampowered.com/ISiteLicenseService/GetCurrentClientConnections/v1/', { siteid }, 'GET', false, 'publisher')
    /**
     * @param {number} [id] ID of game in the game_names section of the response
     * @param {string} [license_type] Playtime is divided up for each game by the type of license used. See the GetCurrentClientConnections section above for the list.
     * @param {number} [playtime_seconds] total playtime for this game and license type, in seconds, for the requested period.
     */
    getTotalPlaytime = (id, license_type, playtime_seconds) => this.request('https://api.steampowered.com/ISiteLicenseService/GetTotalPlaytime/v1/', { id, license_type, playtime_seconds }, 'GET', false)
    /**
     * @param {number} appid The App ID to get the betas of.
     */
    getAppBetas = (appid) => this.request('https://partner.steam-api.com/ISteamApps/GetAppBetas/v1/', { appid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid The App ID to get the build history of.
     * @param {number} [count] The number of builds to retrieve, the default is 10.
     */
    getAppBuilds = (appid, count) => this.request('https://partner.steam-api.com/ISteamApps/GetAppBuilds/v1/', { appid, count }, 'GET', false, 'publisher')
    /**
     * @param {number} appid The App ID to get the depot versions for.
     */
    getAppDepotVersions = (appid) => this.request('https://partner.steam-api.com/ISteamApps/GetAppDepotVersions/v1/', { appid }, 'GET', false, 'publisher')
    /**
    
     */
    getAppList = () => this.request('https://api.steampowered.com/ISteamApps/GetAppList/v2/', {}, 'GET', false)
    /**
     * @param {string} [type_filter] Optional comma separated list of types to filter on
     */
    getPartnerAppListForWebAPIKey = (type_filter) => this.request('https://partner.steam-api.com/ISteamApps/GetPartnerAppListForWebAPIKey/v2/', { type_filter }, 'GET', false, 'publisher')
    /**
     * @param {number} appid AppID of game
     */
    getPlayersBanned = (appid) => this.request('https://partner.steam-api.com/ISteamApps/GetPlayersBanned/v1/', { appid }, 'GET', false, 'publisher')
    /**
     * @param {string} [filter] Query filter string
     * @param {number} [limit] Limit number of servers in the response
     */
    getServerList = (filter, limit) => this.request('https://partner.steam-api.com/ISteamApps/GetServerList/v1/', { filter, limit }, 'GET', false, 'publisher')
    /**
     * @param {string} addr IP or IP:queryport to list
     */
    getServersAtAddress = (addr) => this.request('https://api.steampowered.com/ISteamApps/GetServersAtAddress/v1/', { addr }, 'GET', false)
    /**
     * @param {number} appid AppID of game
     * @param {number} buildid BuildID
     * @param {string} betakey beta key, required. Use public for default branch
     * @param {string} [description] optional description for this build
     */
    setAppBuildLive = (appid, buildid, betakey, description) => this.request('https://partner.steam-api.com/ISteamApps/SetAppBuildLive/v1/', { appid, buildid, betakey, description }, 'POST', false, 'publisher')
    /**
     * @param {number} appid AppID of game
     * @param {number} version The installed version of the game
     */
    upToDateCheck = (appid, version) => this.request('https://api.steampowered.com/ISteamApps/UpToDateCheck/v1/', { appid, version }, 'GET', false)
    /**
     * @param {number} steamidActor SteamID of user doing the reporting
     * @param {number} steamidTarget SteamID of the entity being accused of abuse
     * @param {number} appid AppID to check for ownership
     * @param {number} abuseType Abuse type code (see EAbuseReportType enum)
     * @param {number} contentType Content type code (see ECommunityContentType enum)
     * @param {string} description Narrative from user
     * @param {number} [gid] GID of related record (depends on content type)
     */
    reportAbuse = (steamidActor, steamidTarget, appid, abuseType, contentType, description, gid) => this.request('https://partner.steam-api.com/ISteamCommunity/ReportAbuse/v1/', { steamidActor, steamidTarget, appid, abuseType, contentType, description, gid }, 'POST', false, 'publisher')
    /**
     * @param {number} appid That the key is associated with. Must be a steam economy app.
     * @param {number} steamid SteamID of user attempting to initiate a trade
     * @param {number} targetid SteamID of user that is the target of the trade invitation
     */
    canTrade = (appid, steamid, targetid) => this.request('https://partner.steam-api.com/ISteamEconomy/CanTrade/v1/', { appid, steamid, targetid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid The app ID the user is buying assets for
     * @param {number} steamid SteamID of the user making a purchase
     * @param {string} txnid The transaction ID
     * @param {string} language The local language for the user
     */
    finalizeAssetTransaction = (appid, steamid, txnid, language) => this.request('https://partner.steam-api.com/ISteamEconomy/FinalizeAssetTransaction/v1/', { appid, steamid, txnid, language }, 'POST', false, 'publisher')
    /**
     * @param {number} appid Must be a steam economy app.
     * @param {number} class_count Number of classes requested. Must be at least one.
     * @param {number} classid0 Class ID of the nth class.
     * @param {string} [language] The user's local language
     * @param {number} [instanceid0] Instance ID of the nth class.
     */
    getAssetClassInfo = (appid, class_count, classid0, language, instanceid0) => this.request('https://api.steampowered.com/ISteamEconomy/GetAssetClassInfo/v1/', { appid, class_count, classid0, language, instanceid0 }, 'GET', false, 'user')
    /**
     * @param {number} appid Must be a steam economy app.
     * @param {string} [currency] The currency to filter for
     * @param {string} [language] The user's local language
     */
    getAssetPrices = (appid, currency, language) => this.request('https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/', { appid, currency, language }, 'GET', false, 'user')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid The app to get exported items from.
     * @param {number} contextid The context in the app to get exported items from.
     */
    getExportedAssetsForUser = (steamid, appid, contextid) => this.request('https://partner.steam-api.com/ISteamEconomy/GetExportedAssetsForUser/v1/', { steamid, appid, contextid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid Must be a steam economy app.
     */
    getMarketPrices = (appid) => this.request('https://partner.steam-api.com/ISteamEconomy/GetMarketPrices/v1/', { appid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid The app ID the user is buying assets for
     * @param {number} steamid SteamID of user making a purchase
     * @param {string} assetid0 The ID of the first asset the user is buying - there must be at least one
     * @param {number} assetquantity0 The quantity of assetid0's the the user is buying
     * @param {string} currency The local currency for the user
     * @param {string} language The local language for the user
     * @param {string} ipaddress The user's IP address
     * @param {string} [referrer] The referring URL
     * @param {boolean} [clientauth] If true (default is false), the authorization will appear in the user's steam client overlay, rather than as a web page - useful for stores that are embedded in products.
     */
    startAssetTransaction = (appid, steamid, assetid0, assetquantity0, currency, language, ipaddress, referrer, clientauth) => this.request('https://partner.steam-api.com/ISteamEconomy/StartAssetTransaction/v1/', { appid, steamid, assetid0, assetquantity0, currency, language, ipaddress, referrer, clientauth }, 'POST', false, 'publisher')
    /**
     * @param {number} appid That the key is associated with. Must be a steam economy app.
     * @param {number} partya SteamID of first user in the trade
     * @param {number} partyb SteamID of second user in the trade
     */
    startTrade = (appid, partya, partyb) => this.request('https://partner.steam-api.com/ISteamEconomy/StartTrade/v1/', { appid, partya, partyb }, 'GET', false, 'publisher')
    /**
     * @param {number} gameid game id to get stats for, if not a mod, it's safe to use appid here
     * @param {number} appid appID of the game
     * @param {string} rangestart range start date/time (Format: YYYY-MM-DD HH:MM:SS, Seattle local time)
     * @param {string} rangeend range end date/time (Format: YYYY-MM-DD HH:MM:SS, Seattle local time)
     * @param {number} [maxresults] Max number of results to return (up to 1000)
     */
    getGameServerPlayerStatsForGame = (gameid, appid, rangestart, rangeend, maxresults) => this.request('https://partner.steam-api.com/ISteamGameServerStats/GetGameServerPlayerStatsForGame/v1/', { gameid, appid, rangestart, rangeend, maxresults }, 'GET', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {string} name name of the leaderboard to delete
     */
    deleteLeaderboard = (appid, name) => this.request('https://partner.steam-api.com/ISteamLeaderboards/DeleteLeaderboard/v1/', { appid, name }, 'POST', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {string} name name of the leaderboard to create
     * @param {string} [sortmethod] sort method to use for this leaderboard (defaults to Ascending)
     * @param {string} [displaytype] display type for this leaderboard (defaults to Numeric)
     * @param {boolean} [createifnotfound] if this is true the leaderboard will be created if it doesn't exist. Defaults to true.
     * @param {boolean} [onlytrustedwrites] if this is true the leaderboard scores cannot be set by clients, and can only be set by publisher via SetLeaderboardScore WebAPI. Defaults to false.
     * @param {boolean} [onlyfriendsreads] if this is true the leaderboard scores can only be read for friends by clients, scores can always be read by publisher. Defaults to false.
     */
    findOrCreateLeaderboard = (appid, name, sortmethod, displaytype, createifnotfound, onlytrustedwrites, onlyfriendsreads) => this.request('https://partner.steam-api.com/ISteamLeaderboards/FindOrCreateLeaderboard/v2/', { appid, name, sortmethod, displaytype, createifnotfound, onlytrustedwrites, onlyfriendsreads }, 'POST', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {number} rangestart range start or 0
     * @param {number} rangeend range end or max LB entries
     * @param {number} leaderboardid ID of the leaderboard to view
     * @param {number} datarequest type of request: RequestGlobal, RequestAroundUser, RequestFriends
     * @param {number} [steamid] SteamID used for friend & around user requests
     */
    getLeaderboardEntries = (appid, rangestart, rangeend, leaderboardid, datarequest, steamid) => this.request('https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardEntries/v1/', { appid, rangestart, rangeend, leaderboardid, datarequest, steamid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid appid of game
     */
    getLeaderboardsForGame = (appid) => this.request('https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardsForGame/v2/', { appid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {number} leaderboardid numeric ID of the target leaderboard. Can be retrieved from GetLeaderboardsForGame
     */
    resetLeaderboard = (appid, leaderboardid) => this.request('https://partner.steam-api.com/ISteamLeaderboards/ResetLeaderboard/v1/', { appid, leaderboardid }, 'POST', false, 'publisher')
    /**
     * @param {number} appid appid of game
     * @param {number} leaderboardid numeric ID of the target leaderboard. Can be retrieved from GetLeaderboardsForGame
     * @param {number} steamid steamID to set the score for
     * @param {number} score the score to set for this user
     * @param {string} scoremethod update method to use. Can be "KeepBest" or "ForceUpdate"
     * @param {number} [details] game-specific details for how the score was earned. Up to 256 bytes.
     */
    setLeaderboardScore = (appid, leaderboardid, steamid, score, scoremethod, details) => this.request('https://partner.steam-api.com/ISteamLeaderboards/SetLeaderboardScore/v1/', { appid, leaderboardid, steamid, score, scoremethod, details }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid Steam ID of the client that is adjusting the agreement.
     * @param {number} agreementid Unique 64-bit Steam billing agreement ID.
     * @param {number} appid App ID of the game the agreement is for.
     * @param {string} nextprocessdate Date that next recurring payment should be initiated. Format is YYYYMMDD.
Date can only be adjusted forward indicating you want to add time to the subscription. If the date exceeds the end date of the subscription, the end date will be extended.
     */
    adjustAgreement = (steamid, agreementid, appid, nextprocessdate) => this.request('https://partner.steam-api.com/ISteamMicroTxn/AdjustAgreement/v1/', { steamid, agreementid, appid, nextprocessdate }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid Steam ID of the client that is canceling the agreement.
     * @param {number} agreementid Unique 64-bit Steam billing agreement ID.
     * @param {number} appid App ID of the game the agreement is for.
     */
    cancelAgreement = (steamid, agreementid, appid) => this.request('https://partner.steam-api.com/ISteamMicroTxn/CancelAgreement/v1/', { steamid, agreementid, appid }, 'POST', false, 'publisher')
    /**
     * @param {number} orderid Unique 64-bit ID for order
     * @param {number} appid App ID for game.
     */
    finalizeTxn = (orderid, appid) => this.request('https://partner.steam-api.com/ISteamMicroTxn/FinalizeTxn/v2/', { orderid, appid }, 'POST', false, 'publisher')
    /**
     * @param {number} appid App ID of game to get reports for.
     * @param {string} time Start time of the report. (RFC 3339 UTC formatted like: 2010-01-01T00:00:00Z)
     * @param {string} [type] Report type (One of: "GAMESALES", "STEAMSTORESALES", "SETTLEMENT", "CHARGEBACK")
     * @param {number} [maxresults] Maximum number of results to return in report. (Default is 1000 if no value is set)
     */
    getReport = (appid, time, type, maxresults) => this.request('https://partner.steam-api.com/ISteamMicroTxn/GetReport/v5/', { appid, time, type, maxresults }, 'GET', false, 'publisher')
    /**
     * @param {number} steamid Steam ID of the client.
     * @param {number} appid App ID of the game the agreement is for.
     */
    getUserAgreementInfo = (steamid, appid) => this.request('https://partner.steam-api.com/ISteamMicroTxn/GetUserAgreementInfo/v1/', { steamid, appid }, 'GET', false, 'publisher')
    /**
     * @param {number} appid AppID of the game the user will make a purchase in.
     * @param {number} [steamid] Steam ID of user making purchase.
     * @param {string} [ipaddress] IP address of user in string format (xxx.xxx.xxx.xxx). Only required if usersession in InitTxn was set to web.
     */
    getUserInfo = (appid, steamid, ipaddress) => this.request('https://partner.steam-api.com/ISteamMicroTxn/GetUserInfo/v2/', { appid, steamid, ipaddress }, 'GET', false, 'publisher')
    /**
     * @param {number} orderid Unique 64-bit ID for order
     * @param {number} steamid Steam ID of user making purchase.
     * @param {number} appid App ID of game this transaction is for.
     * @param {number} itemcount Number of items in cart.
     * @param {string} language ISO 639-1 language code of the item descriptions. Only works with the 28 fully supported Steam languages. See supported languages
     * @param {string} currency ISO 4217 currency code. See Supported Currencies for proper format of each currency.
     * @param {number} itemid 3rd party ID for item.
     * @param {number} qty Quantity of this item.
     * @param {number} amount Total cost (in cents) of item(s) to be charged at this time. See Supported Currencies for proper format of each amount. Note that the amount you pass needs to be in the format that matches the "currency" code you pass.
     * @param {string} description Description of item. Maximum length of 128 characters.
     * @param {string} [usersession] Session where user will authorize the transaction. Valid options are "client" or "web". If this parameter is not supplied, the interface will be assumed to be through a currently logged in Steam client session.
     * @param {string} [ipaddress] IP address of user in string format (xxx.xxx.xxx.xxx). Only required if [param]usersession[/param] is set to web.
     * @param {string} [category] Optional text description of a category that this item should be grouped with. This value is used for grouping sales data in backend Steam reporting and is never displayed to the user. Maximum length of 64 characters
     * @param {number} [associated_bundle] Optional bundleid of associated bundle.
     * @param {string} [billingtype] Optional recurring billing type. Valid options are: "Steam" or "Game"

Steam: Steam automatically re-bills
Game: Partner needs to call ProcessAgreement API to bill
     * @param {string} [startdate] Optional start date for recurring billing (RFC 3339 UTC formatted like: 2010-01-01T00:00:00Z).
     * @param {string} [enddate] Optional end date for recurring billing (RFC 3339 UTC formatted like: 2010-01-01T00:00:00Z).
     * @param {string} [period] Optional period for recurring billing. Valid options are: "Day", "Week", "Month", "Year"
     * @param {number} [frequency] Optional frequency (in number of days) for recurring billing. Supported values: 1 - 255
     * @param {number} [recurringamt] Optional amount to be billed for future recurring billing transactions.
     * @param {number} [bundlecount] Number of bundles in cart.
     * @param {number} [bundleid] 3rd party ID of the bundle. This shares the same ID space as 3rd party items.
     * @param {number} [bundle_qty] Quantity of this bundle.
     * @param {string} [bundle_desc] Description of bundle. Maximum length of 128 characters.
     * @param {string} [bundle_category] Optional text description of a bundle category that this item should be grouped with. This value is used for grouping sales data in backend Steam reporting and is never displayed to the user. Maximum length of 64 characters.
     */
    initTxn = (orderid, steamid, appid, itemcount, language, currency, itemid, qty, amount, description, usersession, ipaddress, category, associated_bundle, billingtype, startdate, enddate, period, frequency, recurringamt, bundlecount, bundleid, bundle_qty, bundle_desc, bundle_category) => this.request('https://partner.steam-api.com/ISteamMicroTxn/InitTxn/v3/', { orderid, steamid, appid, itemcount, language, currency, itemid, qty, amount, description, usersession, ipaddress, category, associated_bundle, billingtype, startdate, enddate, period, frequency, recurringamt, bundlecount, bundleid, bundle_qty, bundle_desc, bundle_category }, 'POST', false, 'publisher')
    /**
     * @param {number} orderid Unique 64-bit ID for order. If the recurring subscription was initiated from the Steam store, then this field will be 0.
     * @param {number} steamid Steam ID of the client.
     * @param {number} agreementid Unique 64-bit Steam billing agreement ID.
     * @param {number} appid App ID of the game the agreement is for.
     * @param {number} amount Total cost (in cents).

This value corresponds to an initial one-time amount to be immediately charged to a user.
     * @param {string} currency ISO 4217 currency code of prices
     */
    processAgreement = (orderid, steamid, agreementid, appid, amount, currency) => this.request('https://partner.steam-api.com/ISteamMicroTxn/ProcessAgreement/v1/', { orderid, steamid, agreementid, appid, amount, currency }, 'POST', false, 'publisher')
    /**
     * @param {number} appid App ID of game this transaction is for.
     * @param {number} [orderid] Unique 64-bit ID for order.
     * @param {number} [transid] Unique 64-bit Steam transaction ID.
     */
    queryTxn = (appid, orderid, transid) => this.request('https://partner.steam-api.com/ISteamMicroTxn/QueryTxn/v3/', { appid, orderid, transid }, 'GET', false, 'publisher')
    /**
     * @param {number} orderid Unique 64-bit ID for order to refund.
     * @param {number} appid App ID of the game.
     */
    refundTxn = (orderid, appid) => this.request('https://partner.steam-api.com/ISteamMicroTxn/RefundTxn/v2/', { orderid, appid }, 'POST', false, 'publisher')
    /**
     * @param {number} appid AppID to retrieve news for
     * @param {number} [maxlength] Maximum length for the content to return, if this is 0 the full content is returned, if it's less then a blurb is generated to fit.
     * @param {number} [enddate] Retrieve posts earlier than this date (unix epoch timestamp)
     * @param {number} [count] # of posts to retrieve (default 20)
     * @param {string} [feeds] Comma-seperated list of feed names to return news for
     */
    getNewsForApp = (appid, maxlength, enddate, count, feeds) => this.request('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/', { appid, maxlength, enddate, count, feeds }, 'GET', false)
    /**
     * @param {number} appid AppID to retrieve news for
     * @param {number} [maxlength] Maximum length for the content to return, if this is 0 the full content is returned, if it's less then a blurb is generated to fit.
     * @param {number} [enddate] Retrieve posts earlier than this date (unix epoch timestamp)
     * @param {number} [count] # of posts to retrieve (default 20)
     * @param {string} [feeds] Comma-seperated list of feed names to return news for
     */
    getNewsForAppAuthed = (appid, maxlength, enddate, count, feeds) => this.request('https://partner.steam-api.com/ISteamNews/GetNewsForAppAuthed/v2/', { appid, maxlength, enddate, count, feeds }, 'GET', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID of product
     * @param {number} startidx Starting index in the result set (0 based)
     * @param {number} count Number Requested
     * @param {number} tagcount Number of Tags Specified
     * @param {number} usertagcount Number of User specific tags requested
     * @param {boolean} [hasappadminaccess] Whether the user making the request is an admin for the app and can see private files
     * @param {number} [fileType] EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items
     * @param {string} [tag] Tag to filter result set
     * @param {string} [usertag] A user specific tag
     */
    rankedByPublicationOrder = (steamid, appid, startidx, count, tagcount, usertagcount, hasappadminaccess, fileType, tag, usertag) => this.request('https://partner.steam-api.com/ISteamPublishedItemSearch/RankedByPublicationOrder/v1/', { steamid, appid, startidx, count, tagcount, usertagcount, hasappadminaccess, fileType, tag, usertag }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID of product
     * @param {number} startidx Starting index in the result set (0 based)
     * @param {number} count Number Requested
     * @param {number} tagcount Number of Tags Specified
     * @param {number} usertagcount Number of User specific tags requested
     * @param {boolean} [hasappadminaccess] Whether the user making the request is an admin for the app and can see private files
     * @param {number} [fileType] EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items
     * @param {number} [days] [1,7] number of days for the trend period, including today
     * @param {string} [tag] Tag to filter result set
     * @param {string} [usertag] A user specific tag
     */
    rankedByTrend = (steamid, appid, startidx, count, tagcount, usertagcount, hasappadminaccess, fileType, days, tag, usertag) => this.request('https://partner.steam-api.com/ISteamPublishedItemSearch/RankedByTrend/v1/', { steamid, appid, startidx, count, tagcount, usertagcount, hasappadminaccess, fileType, days, tag, usertag }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID of product
     * @param {number} startidx Starting index in the result set (0 based)
     * @param {number} count Number Requested
     * @param {number} tagcount Number of Tags Specified
     * @param {number} usertagcount Number of User specific tags requested
     * @param {boolean} [hasappadminaccess] Whether the user making the request is an admin for the app and can see private files
     * @param {number} [fileType] EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items
     * @param {string} [tag] Tag to filter result set
     * @param {string} [usertag] A user specific tag
     */
    rankedByVote = (steamid, appid, startidx, count, tagcount, usertagcount, hasappadminaccess, fileType, tag, usertag) => this.request('https://partner.steam-api.com/ISteamPublishedItemSearch/RankedByVote/v1/', { steamid, appid, startidx, count, tagcount, usertagcount, hasappadminaccess, fileType, tag, usertag }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID relevant to all subsequent tags
     * @param {number} tagcount Number of Tags Specified
     * @param {number} usertagcount Number of User specific tags requested
     * @param {boolean} [hasappadminaccess] Whether the user making the request is an admin for the app and can see private files
     * @param {number} [fileType] EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items
     * @param {string} [tag] Tag to filter result set
     * @param {string} [usertag] A user specific tag
     */
    resultSetSummary = (steamid, appid, tagcount, usertagcount, hasappadminaccess, fileType, tag, usertag) => this.request('https://partner.steam-api.com/ISteamPublishedItemSearch/ResultSetSummary/v1/', { steamid, appid, tagcount, usertagcount, hasappadminaccess, fileType, tag, usertag }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid Steam ID of user
     * @param {number} appid appID of product
     * @param {number} count Count of how many items we are querying
     * @param {number} [publishedfileid] The Published File ID who's vote details are required
     */
    itemVoteSummary = (steamid, appid, count, publishedfileid) => this.request('https://partner.steam-api.com/ISteamPublishedItemVoting/ItemVoteSummary/v1/', { steamid, appid, count, publishedfileid }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid Steam ID of user
     * @param {number} count Count of how many items we are querying
     * @param {number} [publishedfileid] A Specific Published Item
     */
    userVoteSummary = (steamid, count, publishedfileid) => this.request('https://partner.steam-api.com/ISteamPublishedItemVoting/UserVoteSummary/v1/', { steamid, count, publishedfileid }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID of product
     * @param {number} [listtype] EUCMListType
     */
    enumerateUserSubscribedFiles = (steamid, appid, listtype) => this.request('https://partner.steam-api.com/ISteamRemoteStorage/EnumerateUserSubscribedFiles/v1/', { steamid, appid, listtype }, 'POST', false, 'publisher')
    /**
     * @param {number} collectioncount Number of collections being requested
     * @param {number} publishedfileids collection ids to get the details for
     */
    getCollectionDetails = (collectioncount, publishedfileids) => this.request('https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/', { collectioncount, publishedfileids }, 'POST', false)
    /**
     * @param {number} itemcount Number of items being requested
     * @param {number} publishedfileids published file id to look up
     */
    getPublishedFileDetails = (itemcount, publishedfileids) => this.request('https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/', { itemcount, publishedfileids }, 'POST', false)
    /**
     * @param {number} ugcid ID of UGC file to get info for
     * @param {number} appid appID of product
     * @param {number} [steamid] If specified, only returns details if the file is owned by the SteamID specified
     */
    getUGCFileDetails = (ugcid, appid, steamid) => this.request('https://api.steampowered.com/ISteamRemoteStorage/GetUGCFileDetails/v1/', { ugcid, appid, steamid }, 'GET', false, 'user')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} ugcid ID of UGC file whose bits are being fiddled with
     * @param {number} appid appID of product to change updating state for
     * @param {boolean} used New state of flag
     */
    setUGCUsedByGC = (steamid, ugcid, appid, used) => this.request('https://partner.steam-api.com/ISteamRemoteStorage/SetUGCUsedByGC/v1/', { steamid, ugcid, appid, used }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID of product
     * @param {number} publishedfileid published file id to subscribe to
     */
    subscribePublishedFile = (steamid, appid, publishedfileid) => this.request('https://partner.steam-api.com/ISteamRemoteStorage/SubscribePublishedFile/v1/', { steamid, appid, publishedfileid }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appID of product
     * @param {number} publishedfileid published file id to unsubscribe from
     */
    unsubscribePublishedFile = (steamid, appid, publishedfileid) => this.request('https://partner.steam-api.com/ISteamRemoteStorage/UnsubscribePublishedFile/v1/', { steamid, appid, publishedfileid }, 'POST', false, 'publisher')
    /**
     * @param {number} steamid Should be the users steamid, unencrypted.
     * @param {number} sessionkey Should be a 32 byte random blob of data, which is then encrypted with RSA using the Steam system's public key. Randomness is important here for security.
     * @param {number} encrypted_loginkey Should be the users hashed loginkey, AES encrypted with the sessionkey.
     */
    authenticateUser = (steamid, sessionkey, encrypted_loginkey) => this.request('https://partner.steam-api.com/ISteamUserAuth/AuthenticateUser/v1/', { steamid, sessionkey, encrypted_loginkey }, 'POST', false)
    /**
     * @param {number} appid appid of game
     * @param {string} ticket Convert the binary ticket data from GetAuthTicketForWebApi into a hexadecimal string and pass that string in as this parameter.
     * @param {string} identity Identifying string passed as a parameter to GetAuthTicketForWebApi when the ticket was created, used to identify the entity calling this webapi. If this identity string is passed, only tickets created with that parameter will successfully authenticate.
     */
    authenticateUserTicket = (appid, ticket, identity) => this.request('https://partner.steam-api.com/ISteamUserAuth/AuthenticateUserTicket/v1/', { appid, ticket, identity }, 'GET', false, 'publisher')
    /**
     * @param {boolean} [ownsapp] Indicates if the user is the actual owner or the app.
     * @param {boolean} [permanent] Whether the user permanetly owns your app. Not true for ownership via Family Sharing, free weekends, or site license
     * @param {string} [timestamp] Time that the app was acquired.
     * @param {number} [ownersteamid] Indicates the true owner of the app.
     * @param {boolean} [sitelicense] Indicates if user is borrowing this license from a PC Cafe site.
     */
    checkAppOwnership = (ownsapp, permanent, timestamp, ownersteamid, sitelicense) => this.request('https://partner.steam-api.com/ISteamUser/CheckAppOwnership/v2/', { ownsapp, permanent, timestamp, ownersteamid, sitelicense }, 'GET', false)
    /**
     * @param {number} steamid SteamID of user
     * @param {string} appids Comma-delimited list of appids (max: 100)
     */
    getAppPriceInfo = (steamid, appids) => this.request('https://partner.steam-api.com/ISteamUser/GetAppPriceInfo/v1/', { steamid, appids }, 'GET', false, 'publisher')
    /**
     * @param {number} rowversion An unsigned 64-bit value used to page through deleted accounts. Pass 0 when calling this API for the first time, then pass the value returned from the previous call for each additional request. This value will need to be stored on your server for future calls.
     */
    getDeletedSteamIDs = (rowversion) => this.request('https://partner.steam-api.com/ISteamUser/GetDeletedSteamIDs/v1/', { rowversion }, 'GET', false, 'publisher')
    /**
     * @param {number} steamid SteamID of user
     * @param {string} [relationship] relationship type (ex: friend)
     */
    getFriendList = (steamid, relationship) => this.request('https://partner.steam-api.com/ISteamUser/GetFriendList/v1/', { steamid, relationship }, 'GET', false, 'user')
    /**
     * @param {string} steamids Comma-delimited list of SteamIDs
     */
    getPlayerBans = (steamids) => this.request('https://partner.steam-api.com/ISteamUser/GetPlayerBans/v1/', { steamids }, 'GET', false, 'user')
    /**
     * @param {string} steamids Comma-delimited list of SteamIDs (max: 100)
     */
    getPlayerSummaries = (steamids) => this.request('https://partner.steam-api.com/ISteamUser/GetPlayerSummaries/v2/', { steamids }, 'GET', false, 'user')
    /**
     * @param {number} [appid] AppID associated with your WebAPI key
     * @param {boolean} [ownsapp] Whether the user currently owns your app. Will be true for ownership via purchases, CD-keys, Family Sharing, free weekends, and site license
     * @param {boolean} [permanent] Whether the user permanetly owns your app. Not true for ownership via Family Sharing, free weekends, or site license
     * @param {string} [timestamp] GMT time for when the user first accquired the appID
     * @param {number} [ownersteamid] SteamID for the actual owner. If the app is owned via Family Sharing, ownersteamid will be the actual owner. Otherwise will be the same steamID passed in
     * @param {boolean} [sitelicense] Indicates if user is borrowing this license from a commercial site
     */
    getPublisherAppOwnership = (appid, ownsapp, permanent, timestamp, ownersteamid, sitelicense) => this.request('https://partner.steam-api.com/ISteamUser/GetPublisherAppOwnership/v3/', { appid, ownsapp, permanent, timestamp, ownersteamid, sitelicense }, 'GET', false)
    /**
     * @param {string|string[]} [steamids] The list of SteamIDs for any accounts that have changed since the provided row versions. Up to 10,000 SteamIDs will be returned per call.
     * @param {string} [packagerowversion] The package row version that matches the last SteamID returned. Store this for future calls to GetPublisherAppOwnershipChanges
     * @param {string} [cdkeyrowversion] The cd key row version that matches the last SteamID returned. Store this for future calls to GetPublisherAppOwnershipChanges
     * @param {boolean} [moredata] Indicates if more and newer data is available.
     */
    getPublisherAppOwnershipChanges = (steamids, packagerowversion, cdkeyrowversion, moredata) => this.request('https://partner.steam-api.com/ISteamUser/GetPublisherAppOwnershipChanges/v1/', Object.assign({ packagerowversion, cdkeyrowversion, moredata }, Array.isArray(steamids) ? { steamids } : { steamid: steamids }), 'GET', false)
    /**
     * @param {number} steamid SteamID of user
     */
    getUserGroupList = (steamid) => this.request('https://partner.steam-api.com/ISteamUser/GetUserGroupList/v1/', { steamid }, 'GET', false, 'publisher')
    /**
     * @param {string} vanityurl The vanity URL to get a SteamID for
     * @param {number} [url_type] The type of vanity URL. 1 (default): Individual profile, 2: Group, 3: Official game group
     */
    resolveVanityURL = (vanityurl, url_type) => this.request('https://partner.steam-api.com/ISteamUser/ResolveVanityURL/v1/', { vanityurl, url_type }, 'GET', false, 'user')
    /**
     * @param {number} gameid GameID to retrieve the achievement percentages for
     */
    getGlobalAchievementPercentagesForApp = (gameid) => this.request('https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/', { gameid }, 'GET', false)
    /**
     * @param {number} appid AppID that we're getting global stats for
     * @param {number} count Number of stats get data for
     * @param {string} name Names of stat to get data for
     * @param {number} [startdate] Start date for daily totals (unix epoch timestamp)
     * @param {number} [enddate] End date for daily totals (unix epoch timestamp)
     */
    getGlobalStatsForGame = (appid, count, name, startdate, enddate) => this.request('https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/', { appid, count, name, startdate, enddate }, 'GET', false)
    /**
     * @param {number} appid AppID that we're getting user count for
     */
    getNumberOfCurrentPlayers = (appid) => this.request('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/', { appid }, 'GET', false)
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid AppID to get achievements for
     * @param {string} [l] Language to return strings for
     */
    getPlayerAchievements = (steamid, appid, l) => this.request('https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/', { steamid, appid, l }, 'GET', false, 'user')
    /**
     * @param {number} appid appid of game
     * @param {string} [l] localized language to return (english, french, etc.)
     */
    getSchemaForGame = (appid, l) => this.request('https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/', { appid, l }, 'GET', false, 'user')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appid of game
     */
    getUserStatsForGame = (steamid, appid) => this.request('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/', { steamid, appid }, 'GET', false, 'user')
    /**
     * @param {number} steamid SteamID of user
     * @param {number} appid appid of game
     * @param {number} count Number of stats and achievements to set a value for (name/value param pairs)
     * @param {string} name Name of stat or achievement to set
     * @param {number} value Value to set
     */
    setUserStatsForGame = (steamid, appid, count, name, value) => this.request('https://partner.steam-api.com/ISteamUserStats/SetUserStatsForGame/v1/', { steamid, appid, count, name, value }, 'POST', false, 'publisher')
    /**
    
     */
    getServerInfo = () => this.request('https://api.steampowered.com/ISteamWebAPIUtil/GetServerInfo/v1/', {}, 'GET', false)
    /**
    
     */
    getSupportedAPIList = () => this.request('https://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v1/', {}, 'GET', false, 'user')
    /**
     * @param {number} appid The App ID that the item belongs to.
     * @param {number} gameitemid 
     * @param {string} associated_workshop_files 
     * @param {string} partner_accounts 
     * @param {boolean} make_workshop_files_subscribable Allow users to subscribe to the workshop items?
     * @param {boolean} [validate_only] Only validates the rules and does not persist them.
     */
    setItemPaymentRules = (appid, gameitemid, associated_workshop_files, partner_accounts, make_workshop_files_subscribable, validate_only) => this.request('https://partner.steam-api.com/IWorkshopService/SetItemPaymentRules/v1/', { appid, gameitemid, associated_workshop_files, partner_accounts, make_workshop_files_subscribable, validate_only }, 'POST', true, 'publisher')
    /**
     * @param {number} appid The App ID that the item belongs to.
     * @param {number} gameitemid 
     */
    getFinalizedContributors = (appid, gameitemid) => this.request('https://partner.steam-api.com/IWorkshopService/GetFinalizedContributors/v1/', { appid, gameitemid }, 'GET', true, 'publisher')
    /**
     * @param {number} appid The App ID that the item belongs to.
     * @param {number} item_id The Workshop item ID to get the revenue of.
     * @param {number} date_start 
     * @param {number} date_end 
     */
    getItemDailyRevenue = (appid, item_id, date_start, date_end) => this.request('https://partner.steam-api.com/IWorkshopService/GetItemDailyRevenue/v1/', { appid, item_id, date_start, date_end }, 'GET', true, 'publisher')
    /**
     * @param {number} appid 
     * @param {string} languages 
     */
    populateItemDescriptions = (appid, languages) => this.request('https://partner.steam-api.com/IWorkshopService/PopulateItemDescriptions/v1/', { appid, languages }, 'POST', true, 'publisher')
}

exports.default = API
module.exports = API