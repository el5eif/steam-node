const endpoints = {
    "ReportPlayerCheating": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/ReportPlayerCheating/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The Steam ID of the user who is being reported for cheating."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID for the game."
            },
            {
                "name": "steamidreporter",
                "type": "uint64",
                "required": false,
                "description": "The Steam ID of the user or game server who is reporting the cheating."
            },
            {
                "name": "appdata",
                "type": "uint64",
                "required": false,
                "description": "App specific data about the type of cheating set by developer. (ex 1 = Aimbot, 2 = Wallhack, 3 = Griefing)"
            },
            {
                "name": "heuristic",
                "type": "bool",
                "required": false,
                "description": "Extra information about the source of the cheating - was it a heuristic."
            },
            {
                "name": "detection",
                "type": "bool",
                "required": false,
                "description": "Extra information about the source of the cheating - was it a detection."
            },
            {
                "name": "playerreport",
                "type": "bool",
                "required": false,
                "description": "Extra information about the source of the cheating - was it a player report."
            },
            {
                "name": "noreportid",
                "type": "bool",
                "required": false,
                "description": "Don't return reportid. This should only be passed if you don't intend to issue a ban based on this report."
            },
            {
                "name": "gamemode",
                "type": "uint32",
                "required": false,
                "description": "Extra information about state of game - was it a specific type of game play or game mode. (0 = generic)"
            },
            {
                "name": "suspicionstarttime",
                "type": "uint32",
                "required": false,
                "description": "Extra information indicating how far back the game thinks is interesting for this user. Unix epoch time (time since Jan 1st, 1970)."
            },
            {
                "name": "severity",
                "type": "uint32",
                "required": false,
                "description": "Level of severity of bad action being reported. Scale set by developer."
            }
        ]
    },
    "RequestPlayerGameBan": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/RequestPlayerGameBan/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of the user who is reported as cheating."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The appid of the game."
            },
            {
                "name": "reportid",
                "type": "uint64",
                "required": true,
                "description": "The reportid originally used to report cheating."
            },
            {
                "name": "cheatdescription",
                "type": "string",
                "required": true,
                "description": "Text describing cheating infraction."
            },
            {
                "name": "duration",
                "type": "uint32",
                "required": true,
                "description": "Ban duration requested in seconds. (duration 0 will issue infinite - less than a year is a suspension and not visible on profile)"
            },
            {
                "name": "delayban",
                "type": "bool",
                "required": true,
                "description": "Delay the ban according to default ban delay rules."
            },
            {
                "name": "flags",
                "type": "uint32",
                "required": true,
                "description": "Additional information about the ban request. (Unused)"
            }
        ]
    },
    "RemovePlayerGameBan": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/RemovePlayerGameBan/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The Steam ID of the user to remove the game ban on."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the game."
            }
        ]
    },
    "GetCheatingReports": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/GetCheatingReports/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID for the game."
            },
            {
                "name": "timeend",
                "type": "uint32",
                "required": true,
                "description": "The end of the time range. Formatted as Unix epoch time (time since Jan 1st, 1970)."
            },
            {
                "name": "timebegin",
                "type": "uint32",
                "required": true,
                "description": "The beginning of the time range. Formatted as Unix epoch time (time since Jan 1st, 1970)."
            },
            {
                "name": "reportidmin",
                "type": "uint64",
                "required": true,
                "description": "Minimum reportID to include. (can pass 0 - end of previous report range)"
            },
            {
                "name": "includereports",
                "type": "bool",
                "required": true,
                "description": "Include reports. If false includebans must be true."
            },
            {
                "name": "includebans",
                "type": "bool",
                "required": true,
                "description": "Include ban requests? If false includereports must be true."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Query just for this Steam ID."
            }
        ]
    },
    "ReportCheatData": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://api.steampowered.com/ICheatReportingService/ReportCheatData/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of the user running and reporting the cheat."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the game."
            },
            {
                "name": "pathandfilename",
                "type": "string",
                "required": true,
                "description": "Path and file name of the cheat executable."
            },
            {
                "name": "webcheaturl",
                "type": "string",
                "required": true,
                "description": "Web url where the cheat was found and downloaded."
            },
            {
                "name": "time_now",
                "type": "uint64",
                "required": true,
                "description": "Local system time now. 64 bit windows system time."
            },
            {
                "name": "time_started",
                "type": "uint64",
                "required": true,
                "description": "Local system time when cheat process started. ( 0 if not yet run ) 64 bit windows system time."
            },
            {
                "name": "time_stopped",
                "type": "uint64",
                "required": true,
                "description": "Local system time when cheat process stopped. ( 0 if still running ) 64 bit windows system time."
            },
            {
                "name": "cheatname",
                "type": "string",
                "required": true,
                "description": "Descriptive name for the cheat."
            },
            {
                "name": "game_process_id",
                "type": "uint32",
                "required": true,
                "description": "Process ID of the running game."
            },
            {
                "name": "cheat_process_id",
                "type": "uint32",
                "required": true,
                "description": "Process ID of the cheat process that ran."
            },
            {
                "name": "cheat_param_1",
                "type": "uint64",
                "required": true,
                "description": "Extra cheat data."
            },
            {
                "name": "cheat_param_2",
                "type": "uint64",
                "required": true,
                "description": "Extra cheat data."
            }
        ]
    },
    "RequestVacStatusForUser": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/RequestVacStatusForUser/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The Steam ID of the user."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the game the user is playing."
            },
            {
                "name": "session_id",
                "type": "uint64",
                "required": false,
                "description": "The Session ID that was obtained from the call to StartSecureMultiplayerSession."
            }
        ]
    },
    "StartSecureMultiplayerSession": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/StartSecureMultiplayerSession/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "steamid of the user."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the game."
            }
        ]
    },
    "EndSecureMultiplayerSession": {
        "parent": "ICheatReportingService",
        "service": true,
        "url": "https://partner.steam-api.com/ICheatReportingService/EndSecureMultiplayerSession/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "steamid of the user."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the game."
            },
            {
                "name": "session_id",
                "type": "uint64",
                "required": true,
                "description": "The Session ID that was obtained from the call to StartSecureMultiplayerSession."
            }
        ]
    },
    "EnumerateUserFiles": {
        "parent": "ICloudService",
        "service": true,
        "url": "https://api.steampowered.com/ICloudService/EnumerateUserFiles/v1/?access_token=<token>&appid=1234&extended_details=1",
        "method": "GET",
        "params": [
            {
                "name": "appid",
                "type": "uint32",
                "description": "same app id"
            },
            {
                "name": "ugcid",
                "type": "uint64",
                "description": "unique file ID"
            },
            {
                "name": "filename",
                "type": "string",
                "description": "the file name"
            },
            {
                "name": "timestamp",
                "type": "uint64",
                "description": "epoch time when the file was last modified"
            },
            {
                "name": "file_size",
                "type": "uint32",
                "description": "size of the file in bytes"
            },
            {
                "name": "url",
                "type": "string",
                "description": "a URL which can be used to download the file"
            },
            {
                "name": "steamid_creator",
                "type": "uint64",
                "description": "SteamID of the user"
            },
            {
                "name": "flags",
                "type": "uint32",
                "description": "Steam internal use only"
            },
            {
                "name": "platforms_to_sync",
                "type": "string",
                "description": "List of platforms for which this file is valid. See Uploading Files for the list of possible values."
            },
            {
                "name": "file_sha",
                "type": "string",
                "description": "Hex string (40 digits) representing the SHA1 digest of the file."
            }
        ]
    },
    "CompleteAppUploadBatch": {
        "parent": "ICloudService",
        "service": true,
        "url": "https://api.steampowered.com/ICloudService/CompleteAppUploadBatch/v1/",
        "method": "POST",
        "params": [
            {
                "name": "access_token",
                "type": "string",
                "required": true,
                "description": "OAuth access token for the user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "Your App ID"
            },
            {
                "name": "batch_id",
                "type": "uint64",
                "required": true,
                "description": "The ID number of this batch"
            },
            {
                "name": "batch_eresult",
                "type": "uint32",
                "required": true,
                "description": "Result of the batch (see remarks)"
            }
        ]
    },
    "BeginHTTPUpload": {
        "parent": "ICloudService",
        "service": true,
        "url": "https://steamcloud-us-west1.storage.googleapis.com/00/00/00/00/1234/012_3_4A77D494_9D267_1464.dat?GoogleAccessId=numbersandletters@developer.gserviceaccount.com&Expires=1595961837&Signature=morestuffhere",
        "method": "PUT",
        "params": [
            {
                "name": "name",
                "type": "string",
                "description": "the header name"
            },
            {
                "name": "value",
                "type": "string",
                "description": "the header value"
            }
        ]
    },
    "CommitHTTPUpload": {
        "parent": "ICloudService",
        "service": true,
        "url": "https://api.steampowered.com/ICloudService/CommitHTTPUpload/v1/",
        "method": "POST",
        "params": [
            {
                "name": "access_token",
                "type": "string",
                "required": true,
                "description": "OAuth access token for the user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "Your App ID"
            },
            {
                "name": "transfer_succeeded",
                "type": "bool",
                "required": true,
                "description": "true if the PUT request succeeded"
            },
            {
                "name": "filename",
                "type": "string",
                "required": true,
                "description": "the file name"
            },
            {
                "name": "file_sha",
                "type": "string",
                "required": true,
                "description": "Hex string (40 digits) representing the SHA1 digest of the file."
            }
        ]
    },
    "Delete": {
        "parent": "ICloudService",
        "service": true,
        "url": "https://api.steampowered.com/ICloudService/Delete/v1/",
        "method": "POST",
        "params": [
            {
                "name": "access_token",
                "type": "string",
                "required": true,
                "description": "OAuth access token for the user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "Your App ID"
            },
            {
                "name": "filename",
                "type": "string",
                "required": true,
                "description": "filename of the file to delete"
            }
        ]
    },
    "GetMarketEligibility": {
        "parent": "IEconMarketService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconMarketService/GetMarketEligibility/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The SteamID of the user to check"
            }
        ]
    },
    "CancelAppListingsForUser": {
        "parent": "IEconMarketService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconMarketService/CancelAppListingsForUser/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The app making the request"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The SteamID of the user whose listings should be canceled"
            },
            {
                "name": "synchronous",
                "type": "bool",
                "required": true,
                "description": "Whether or not to wait until all listings have been canceled before returning the response"
            }
        ]
    },
    "GetAssetID": {
        "parent": "IEconMarketService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconMarketService/GetAssetID/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The app that's asking. Must match the app of the listing and must belong to the publisher group that owns the API key making the request"
            },
            {
                "name": "listingid",
                "type": "uint64",
                "required": true,
                "description": "The identifier of the listing to get information for"
            }
        ]
    },
    "GetPopular": {
        "parent": "IEconMarketService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconMarketService/GetPopular/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "The language to use in item descriptions"
            },
            {
                "name": "rows",
                "type": "uint32",
                "required": false,
                "description": "Number of rows per page"
            },
            {
                "name": "start",
                "type": "uint32",
                "required": true,
                "description": "The result number to start at"
            },
            {
                "name": "filter_appid",
                "type": "uint32",
                "required": true,
                "description": "If present, the app ID to limit results to"
            },
            {
                "name": "ecurrency",
                "type": "uint32",
                "required": true,
                "description": "If present, prices returned will be represented in this currency"
            }
        ]
    },
    "GetTradeHistory": {
        "parent": "IEconService",
        "service": true,
        "url": "https://api.steampowered.com/IEconService/GetTradeHistory/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "max_trades",
                "type": "uint32",
                "required": true,
                "description": "The number of trades to return information for"
            },
            {
                "name": "start_after_time",
                "type": "uint32",
                "required": true,
                "description": "The time of the last trade shown on the previous page of results, or the time of the first trade if navigating back"
            },
            {
                "name": "start_after_tradeid",
                "type": "uint64",
                "required": true,
                "description": "The tradeid shown on the previous page of results, or the ID of the first trade if navigating back"
            },
            {
                "name": "navigating_back",
                "type": "bool",
                "required": true,
                "description": "The user wants the previous page of results, so return the previous max_trades trades before the start time and ID"
            },
            {
                "name": "get_descriptions",
                "type": "bool",
                "required": true,
                "description": "If set, the item display data for the items included in the returned trades will also be returned"
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "The language to use when loading item display data"
            },
            {
                "name": "include_failed",
                "type": "bool",
                "required": true,
                "description": ""
            },
            {
                "name": "include_total",
                "type": "bool",
                "required": true,
                "description": "If set, the total number of trades the account has participated in will be included in the response"
            }
        ]
    },
    "FlushInventoryCache": {
        "parent": "IEconService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconService/FlushInventoryCache/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "User to clear cache for."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App to clear cache for."
            },
            {
                "name": "contextid",
                "type": "uint64",
                "required": true,
                "description": "Context to clear cache for."
            }
        ]
    },
    "FlushAssetAppearanceCache": {
        "parent": "IEconService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconService/FlushAssetAppearanceCache/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            }
        ]
    },
    "FlushContextCache": {
        "parent": "IEconService",
        "service": true,
        "url": "https://partner.steam-api.com/IEconService/FlushContextCache/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            }
        ]
    },
    "GetTradeOffers": {
        "parent": "IEconService",
        "service": true,
        "url": "https://api.steampowered.com/IEconService/GetTradeOffers/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "get_sent_offers",
                "type": "bool",
                "required": true,
                "description": "Request the list of sent offers."
            },
            {
                "name": "get_received_offers",
                "type": "bool",
                "required": true,
                "description": "Request the list of received offers."
            },
            {
                "name": "get_descriptions",
                "type": "bool",
                "required": true,
                "description": "If set, the item display data for the items included in the returned trade offers will also be returned."
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "The language to use when loading item display data."
            },
            {
                "name": "active_only",
                "type": "bool",
                "required": true,
                "description": "Indicates we should only return offers which are still active, or offers that have changed in state since the time_historical_cutoff"
            },
            {
                "name": "historical_only",
                "type": "bool",
                "required": true,
                "description": "Indicates we should only return offers which are not active."
            },
            {
                "name": "time_historical_cutoff",
                "type": "uint32",
                "required": true,
                "description": "When active_only is set, offers updated since this time will also be returned"
            }
        ]
    },
    "GetTradeOffer": {
        "parent": "IEconService",
        "service": true,
        "url": "https://api.steampowered.com/IEconService/GetTradeOffer/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "tradeofferid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": ""
            }
        ]
    },
    "GetTradeOffersSummary": {
        "parent": "IEconService",
        "service": true,
        "url": "https://api.steampowered.com/IEconService/GetTradeOffersSummary/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "time_last_visit",
                "type": "uint32",
                "required": true,
                "description": "The time the user last visited. If not passed, will use the time the user last visited the trade offer page."
            }
        ]
    },
    "GetHistoryCommandDetails": {
        "parent": "IGameInventory",
        "service": false,
        "url": "https://partner.steam-api.com/IGameInventory/GetHistoryCommandDetails/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The steam ID of the account to operate on"
            },
            {
                "name": "command",
                "type": "string",
                "required": true,
                "description": "The command to run on that asset"
            },
            {
                "name": "contextid",
                "type": "uint64",
                "required": true,
                "description": "The context to fetch history for"
            },
            {
                "name": "arguments",
                "type": "string",
                "required": true,
                "description": "The arguments that were provided with the command in the first place"
            }
        ]
    },
    "GetUserHistory": {
        "parent": "IGameInventory",
        "service": false,
        "url": "https://partner.steam-api.com/IGameInventory/GetUserHistory/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The Steam ID to fetch history for"
            },
            {
                "name": "contextid",
                "type": "uint64",
                "required": true,
                "description": "The context to fetch history for"
            },
            {
                "name": "starttime",
                "type": "uint32",
                "required": true,
                "description": "Start time of the history range to collect"
            },
            {
                "name": "endtime",
                "type": "uint32",
                "required": true,
                "description": "End time of the history range to collect"
            }
        ]
    },
    "HistoryExecuteCommands": {
        "parent": "IGameInventory",
        "service": false,
        "url": "https://partner.steam-api.com/IGameInventory/HistoryExecuteCommands/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The asset ID to operate on"
            },
            {
                "name": "contextid",
                "type": "uint64",
                "required": true,
                "description": "The context to fetch history for"
            },
            {
                "name": "actorid",
                "type": "uint32",
                "required": true,
                "description": "A unique 32 bit ID for the support person executing the command"
            }
        ]
    },
    "SupportGetAssetHistory": {
        "parent": "IGameInventory",
        "service": false,
        "url": "https://partner.steam-api.com/IGameInventory/SupportGetAssetHistory/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "assetid",
                "type": "uint64",
                "required": true,
                "description": "The asset ID to operate on"
            },
            {
                "name": "contextid",
                "type": "uint64",
                "required": true,
                "description": "The context to fetch history for"
            }
        ]
    },
    "UpdateItemDefs": {
        "parent": "IGameInventory",
        "service": false,
        "url": "https://partner.steam-api.com/IGameInventory/UpdateItemDefs/v0001",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "itemdefs",
                "type": "JSON array",
                "required": true,
                "description": "One or more Item Definitions, presented as a JSON array, to be updated or created."
            }
        ]
    },
    "CreateSession": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/CreateSession/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID to create the session for."
            },
            {
                "name": "context",
                "type": "uint64",
                "required": true,
                "description": "Game-specified context value the game can use to associate the session with some object on their backend."
            },
            {
                "name": "title",
                "type": "string",
                "required": true,
                "description": "The title of the session to be displayed within each user's list of sessions."
            },
            {
                "name": "users",
                "type": "string",
                "required": true,
                "description": "The initial state of all users in the session."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": false,
                "description": "Steam ID to make the request on behalf of -- if specified, the user must be in the session and all users being added to the session must be friends with the user."
            }
        ]
    },
    "UpdateSession": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/UpdateSession/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "sessionid",
                "type": "uint64",
                "required": true,
                "description": "The sessionid to update."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the session to update."
            },
            {
                "name": "title",
                "type": "string",
                "required": true,
                "description": "The new title of the session. If not specified, the title will not be changed."
            },
            {
                "name": "users",
                "type": "string",
                "required": true,
                "description": "A list of users whose state will be updated to reflect the given state. If the users are not already in the session, they will be added to it."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID to make the request on behalf of -- if specified, the user must be in the session."
            }
        ]
    },
    "EnumerateSessionsForApp": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/EnumerateSessionsForApp/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The sessionid to request details for. Optional. If not specified, all the user's sessions will be returned."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The user whose sessions are to be enumerated."
            },
            {
                "name": "include_all_user_messages",
                "type": "bool",
                "required": true,
                "description": "Set whether the message for all users should be included. Defaults to false."
            },
            {
                "name": "include_auth_user_message",
                "type": "bool",
                "required": true,
                "description": "Set whether the message for the authenticated user should be included. Defaults to false."
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "Language to localize the text in."
            }
        ]
    },
    "GetSessionDetailsForApp": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/GetSessionDetailsForApp/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "sessions",
                "type": "string",
                "required": true,
                "description": "The session(s) to receive the details for"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The appid for the sessions."
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "Language to localize the text in."
            }
        ]
    },
    "RequestNotifications": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/RequestNotifications/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The Steam ID to request notifications for."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID to request notifications for."
            }
        ]
    },
    "DeleteSession": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/DeleteSession/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "sessionid",
                "type": "uint64",
                "required": true,
                "description": "The sessionid to delete."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID of the session to delete."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID to make the request on behalf of -- if specified, the user must be in the session."
            }
        ]
    },
    "DeleteSessionBatch": {
        "parent": "IGameNotificationsService",
        "service": true,
        "url": "https://partner.steam-api.com/IGameNotificationsService/DeleteSessionBatch/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "sessionid",
                "type": "uint64",
                "required": true,
                "description": "The sessionid to delete."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The appid of the session to delete."
            }
        ]
    },
    "GetAccountList": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/GetAccountList/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            }
        ]
    },
    "CreateAccount": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/CreateAccount/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The app to use the account for"
            },
            {
                "name": "memo",
                "type": "string",
                "required": true,
                "description": "The memo to set on the new account"
            }
        ]
    },
    "SetMemo": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/SetMemo/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The SteamID of the game server to set the memo on"
            },
            {
                "name": "memo",
                "type": "string",
                "required": true,
                "description": "The memo to set on the new account"
            }
        ]
    },
    "ResetLoginToken": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/ResetLoginToken/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The SteamID of the game server to reset the login token of"
            }
        ]
    },
    "DeleteAccount": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/DeleteAccount/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The SteamID of the game server account to delete"
            }
        ]
    },
    "GetAccountPublicInfo": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/GetAccountPublicInfo/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The SteamID of the game server to get info on"
            }
        ]
    },
    "QueryLoginToken": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/QueryLoginToken/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "login_token",
                "type": "string",
                "required": true,
                "description": "Login token to query"
            }
        ]
    },
    "GetServerSteamIDsByIP": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/GetServerSteamIDsByIP/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "server_ips",
                "type": "string",
                "required": true,
                "description": ""
            }
        ]
    },
    "GetServerIPsBySteamID": {
        "parent": "IGameServersService",
        "service": true,
        "url": "https://api.steampowered.com/IGameServersService/GetServerIPsBySteamID/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "server_steamids",
                "type": "uint64",
                "required": true,
                "description": ""
            }
        ]
    },
    "AddItem": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/AddItem/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The ID of the application associated with the item."
            },
            {
                "name": "itemdefid",
                "type": "uint64",
                "required": true,
                "description": "List of the itemdefid's to grant. This should be specified as a series of parameters named 'itemdefid[0]', 'itemdefid[1]', etc."
            },
            {
                "name": "itempropsjson",
                "type": "string",
                "required": true,
                "description": ""
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of the player to receive the items."
            },
            {
                "name": "notify",
                "type": "bool",
                "required": true,
                "description": "Optional, default 0. Set to 1 to indicate the user is not in-game and should see a Steam notification."
            },
            {
                "name": "requestid",
                "type": "uint64",
                "required": true,
                "description": "Optional, default 0. Clients may provide a unique identifier for a request to perform at most once execution. When a requestid is resubmitted, it will not cause the work to be performed again; the response message will be the current state of items affected by the original successful execution."
            },
            {
                "name": "trade_restriction",
                "type": "bool",
                "required": true,
                "description": "Optional, default 0. Set to 1 to have Steam apply market and trade cooldowns as if this was a purchased item."
            }
        ]
    },
    "AddPromoItem": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/AddPromoItem/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "itemdefid",
                "type": "uint64",
                "required": false,
                "description": ""
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "notify",
                "type": "bool",
                "required": false,
                "description": "Should notify the user that the item was added to their Steam Inventory."
            },
            {
                "name": "requestid",
                "type": "uint64",
                "required": "Clients may provide a unique identifier for a request to perform at most once execution. When a requestid is resubmitted, it will not cause the work to be performed again; the response message will be the current state of items affected by the original successful execution.",
                "description": ""
            }
        ]
    },
    "ConsumeItem": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/ConsumeItem/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "itemid",
                "type": "uint64",
                "required": true,
                "description": "Item ID to be consumed"
            },
            {
                "name": "quantity",
                "type": "string",
                "required": true,
                "description": "Amount of the given item stack to be consumed"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "requestid",
                "type": "uint64",
                "required": true,
                "description": "Clients may provide a unique identifier for a request to perform at most once execution. When a requestid is resubmitted, it will not cause the work to be performed again; the response message will be the current state of items affected by the original successful execution."
            }
        ]
    },
    "ExchangeItem": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/ExchangeItem/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The ID of the application associated with the item."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of the player that owns the items."
            },
            {
                "name": "materialsitemid",
                "type": "uint64",
                "required": true,
                "description": "The unique ID an item in the player's inventory to be converted to the target item type. This should be provided as materialsitemid[0], materialsitemid[1], etc."
            },
            {
                "name": "materialsquantity",
                "type": "uint32",
                "required": true,
                "description": "The quantity of the matching item that should be used in this recipe. This array must be the same length as materialsitemid."
            },
            {
                "name": "outputitemdefid",
                "type": "uint64",
                "required": true,
                "description": "The ItemDef of the item to be created."
            }
        ]
    },
    "GetInventory": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/GetInventory/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The ID of the application associated with the item."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "64-bit Steam ID of the user whose inventory you are requesting."
            }
        ]
    },
    "GetItemDefs": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/GetItemDefs/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The ID of the application associated with the item."
            },
            {
                "name": "modifiedsince",
                "type": "string",
                "required": true,
                "description": "Use to retrieve just updates to the itemdefs since a given time. Format is yyyymmddThhmmssZ (E.g. 20140808T010203Z)."
            },
            {
                "name": "itemdefids",
                "type": "uint64",
                "required": true,
                "description": "Use to retrieve just specific itemdefs by itemdefid"
            },
            {
                "name": "workshopids",
                "type": "uint64",
                "required": true,
                "description": "Use to retrieve just specific itemdefs by workshopid"
            },
            {
                "name": "cache_max_age_seconds",
                "type": "uint32",
                "required": false,
                "description": "Allow stale data to be returned for the specified number of seconds."
            }
        ]
    },
    "GetPriceSheet": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://api.steampowered.com/IInventoryService/GetPriceSheet/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "ecurrency",
                "type": "int32",
                "required": true,
                "description": ""
            }
        ]
    },
    "Consolidate": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/Consolidate/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "itemdefid",
                "type": "uint64 array",
                "required": true,
                "description": ""
            },
            {
                "name": "force",
                "type": "bool",
                "required": false,
                "description": ""
            }
        ]
    },
    "GetQuantity": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/GetQuantity/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "itemdefid",
                "type": "uint64[]",
                "required": true,
                "description": "List of the itemdefid's to query. This should be specified as a series of parameters named 'itemdefid[0]', 'itemdefid[1]', etc."
            },
            {
                "name": "force",
                "type": "bool",
                "required": false,
                "description": ""
            }
        ]
    },
    "ModifyItems": {
        "parent": "IInventoryService",
        "service": true,
        "url": "https://partner.steam-api.com/IInventoryService/ModifyItems/v1/",
        "method": "POST",
        "params": [
            {
                "name": "itemid",
                "type": "uint64",
                "required": true,
                "description": "The id of the item being modified."
            },
            {
                "name": "property_name",
                "type": "string",
                "required": true,
                "description": "The name of the dynamic property being added/updated/removed."
            },
            {
                "name": "property_value_string",
                "type": "string",
                "required": false,
                "description": "The string value of the property to set."
            },
            {
                "name": "property_value_bool",
                "type": "bool",
                "required": false,
                "description": "The boolean value of the property to set."
            },
            {
                "name": "property_value_int",
                "type": "int64",
                "required": false,
                "description": "The 64 bit integer value of the property to set."
            },
            {
                "name": "property_value_float",
                "type": "string",
                "required": false,
                "description": "The 32 bit float value of the property to set."
            },
            {
                "name": "remove_property",
                "type": "bool",
                "required": false,
                "description": "Set to true if the property should be removed."
            }
        ]
    },
    "CreateLobby": {
        "parent": "ILobbyMatchmakingService",
        "service": true,
        "url": "https://partner.steam-api.com/ILobbyMatchmakingService/CreateLobby/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key_name",
                "type": "string",
                "required": false,
                "description": "Key name"
            },
            {
                "name": "key_value",
                "type": "string",
                "required": false,
                "description": "Key value"
            }
        ]
    },
    "RemoveUserFromLobby": {
        "parent": "ILobbyMatchmakingService",
        "service": true,
        "url": "https://partner.steam-api.com/ILobbyMatchmakingService/RemoveUserFromLobby/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The ID of the application associated with the lobby."
            },
            {
                "name": "steamid_to_remove",
                "type": "uint64",
                "required": true,
                "description": "SteamID of the user to remove. If the user is not online when called, this will remove their reserved slot in the lobby."
            },
            {
                "name": "steamid_lobby",
                "type": "uint64",
                "required": true,
                "description": "Lobby ID"
            },
            {
                "name": "input_json",
                "type": "string",
                "required": false,
                "description": "Json data. Required for data that cannot be posted parameters, but can also be used for the other parameters"
            }
        ]
    },
    "GetLobbyData": {
        "parent": "ILobbyMatchmakingService",
        "service": true,
        "url": "https://partner.steam-api.com/ILobbyMatchmakingService/GetLobbyData/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The ID of the application associated with the lobby."
            },
            {
                "name": "steamid_lobby",
                "type": "uint64",
                "required": true,
                "description": "Lobby ID."
            }
        ]
    },
    "GetRecentlyPlayedGames": {
        "parent": "IPlayerService",
        "service": true,
        "url": "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The player we're asking about"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "The number of games to return (0/unset: all)"
            }
        ]
    },
    "GetOwnedGames": {
        "parent": "IPlayerService",
        "service": true,
        "url": "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The player we're asking about"
            },
            {
                "name": "include_appinfo",
                "type": "bool",
                "required": true,
                "description": "true if we want additional details (name, icon) about each game"
            },
            {
                "name": "include_played_free_games",
                "type": "bool",
                "required": true,
                "description": "Free games are excluded by default. If this is set, free games the user has played will be returned."
            },
            {
                "name": "appids_filter",
                "type": "uint32",
                "required": true,
                "description": "if set, restricts result set to the passed in apps"
            }
        ]
    },
    "GetSteamLevel": {
        "parent": "IPlayerService",
        "service": true,
        "url": "https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The player we're asking about"
            }
        ]
    },
    "GetBadges": {
        "parent": "IPlayerService",
        "service": true,
        "url": "https://api.steampowered.com/IPlayerService/GetBadges/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The player we're asking about"
            }
        ]
    },
    "GetCommunityBadgeProgress": {
        "parent": "IPlayerService",
        "service": true,
        "url": "https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "The player we're asking about"
            },
            {
                "name": "badgeid",
                "type": "int32",
                "required": true,
                "description": "The badge we're asking about"
            }
        ]
    },
    "QueryFiles": {
        "parent": "IPublishedFileService",
        "service": true,
        "url": "https://api.steampowered.com/IPublishedFileService/QueryFiles/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "query_type",
                "type": "uint32",
                "required": true,
                "description": "IPublishedFileService#EPublishedFileQueryType"
            },
            {
                "name": "page",
                "type": "uint32",
                "required": true,
                "description": "Current page. Currently there is an upper limit of 1000."
            },
            {
                "name": "cursor",
                "type": "string",
                "required": true,
                "description": "Cursor to paginate through the results (set to '*' for the first request). Prefer this over using the page parameter, as it will allow you to do deep pagination. When used, the page parameter will be ignored. Use the \"next_cursor\" value returned in the response to set up the next query to get the next set of results."
            },
            {
                "name": "numperpage",
                "type": "uint32",
                "required": false,
                "description": "The number of results, per page to return."
            },
            {
                "name": "creator_appid",
                "type": "uint32",
                "required": true,
                "description": "App that created the files"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App that consumes the files"
            },
            {
                "name": "requiredtags",
                "type": "string",
                "required": true,
                "description": "Tags to match on. See match_all_tags parameter below"
            },
            {
                "name": "excludedtags",
                "type": "string",
                "required": true,
                "description": "Tags that must NOT be present on a published file to satisfy the query."
            },
            {
                "name": "match_all_tags",
                "type": "bool",
                "required": false,
                "description": "If true, then items must have all the tags specified, otherwise they must have at least one of the tags."
            },
            {
                "name": "required_flags",
                "type": "string",
                "required": true,
                "description": "Required flags that must be set on any returned items"
            },
            {
                "name": "omitted_flags",
                "type": "string",
                "required": true,
                "description": "Flags that must not be set on any returned items"
            },
            {
                "name": "search_text",
                "type": "string",
                "required": true,
                "description": "Text to match in the item's title or description"
            },
            {
                "name": "filetype",
                "type": "uint32",
                "required": true,
                "description": "IPublishedFileService#EPublishedFileInfoMatchingFileType"
            },
            {
                "name": "child_publishedfileid",
                "type": "uint64",
                "required": true,
                "description": "Find all items that reference the given item."
            },
            {
                "name": "days",
                "type": "uint32",
                "required": true,
                "description": "If query_type is k_PublishedFileQueryType_RankedByTrend, then this is the number of days to get votes for [1,7]."
            },
            {
                "name": "include_recent_votes_only",
                "type": "bool",
                "required": true,
                "description": "If query_type is k_PublishedFileQueryType_RankedByTrend, then limit result set just to items that have votes within the day range given"
            },
            {
                "name": "cache_max_age_seconds",
                "type": "uint32",
                "required": false,
                "description": "Allow stale data to be returned for the specified number of seconds."
            },
            {
                "name": "language",
                "type": "int32",
                "required": false,
                "description": "Language to search in and also what gets returned. Defaults to English."
            },
            {
                "name": "required_kv_tags",
                "type": "string",
                "required": true,
                "description": "Required key-value tags to match on."
            },
            {
                "name": "totalonly",
                "type": "bool",
                "required": true,
                "description": "If true, only return the total number of files that satisfy this query."
            },
            {
                "name": "ids_only",
                "type": "bool",
                "required": true,
                "description": "If true, only return the published file ids of files that satisfy this query."
            },
            {
                "name": "return_vote_data",
                "type": "bool",
                "required": true,
                "description": "Return vote data"
            },
            {
                "name": "return_tags",
                "type": "bool",
                "required": true,
                "description": "Return tags in the file details"
            },
            {
                "name": "return_kv_tags",
                "type": "bool",
                "required": true,
                "description": "Return key-value tags in the file details"
            },
            {
                "name": "return_previews",
                "type": "bool",
                "required": true,
                "description": "Return preview image and video details in the file details"
            },
            {
                "name": "return_children",
                "type": "bool",
                "required": true,
                "description": "Return child item ids in the file details"
            },
            {
                "name": "return_short_description",
                "type": "bool",
                "required": true,
                "description": "Populate the short_description field instead of file_description"
            },
            {
                "name": "return_for_sale_data",
                "type": "bool",
                "required": true,
                "description": "Return pricing information, if applicable"
            },
            {
                "name": "return_metadata",
                "type": "bool",
                "required": false,
                "description": "Populate the metadata"
            },
            {
                "name": "return_playtime_stats",
                "type": "uint32",
                "required": true,
                "description": "Return playtime stats for the specified number of days before today."
            }
        ]
    },
    "SetDeveloperMetadata": {
        "parent": "IPublishedFileService",
        "service": true,
        "url": "https://partner.steam-api.com/IPublishedFileService/SetDeveloperMetadata/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "publishedfileid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "metadata",
                "type": "string",
                "required": true,
                "description": ""
            }
        ]
    },
    "UpdateAppUGCBan": {
        "parent": "IPublishedFileService",
        "service": true,
        "url": "https://partner.steam-api.com/IPublishedFileService/UpdateAppUGCBan/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of the user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "expiration_time",
                "type": "uint32",
                "required": true,
                "description": "Unix timestamp when the ban expires, 0 to remove"
            },
            {
                "name": "reason",
                "type": "string",
                "required": false,
                "description": "Reason the user was banned. Will be displayed to the user."
            }
        ]
    },
    "UpdateBanStatus": {
        "parent": "IPublishedFileService",
        "service": true,
        "url": "https://partner.steam-api.com/IPublishedFileService/UpdateBanStatus/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "publishedfileid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "banned",
                "type": "bool",
                "required": true,
                "description": ""
            },
            {
                "name": "reason",
                "type": "string",
                "required": true,
                "description": "Reason why the item was banned. Only visible to admins."
            }
        ]
    },
    "UpdateIncompatibleStatus": {
        "parent": "IPublishedFileService",
        "service": true,
        "url": "https://partner.steam-api.com/IPublishedFileService/UpdateIncompatibleStatus/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "publishedfileid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "incompatible",
                "type": "bool",
                "required": true,
                "description": ""
            }
        ]
    },
    "UpdateTags": {
        "parent": "IPublishedFileService",
        "service": true,
        "url": "https://partner.steam-api.com/IPublishedFileService/UpdateTags/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "publishedfileid",
                "type": "uint64",
                "required": true,
                "description": ""
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "add_tags",
                "type": "string",
                "required": false,
                "description": "Tags to add"
            },
            {
                "name": "remove_tags",
                "type": "string",
                "required": false,
                "description": "Tags to remove"
            }
        ]
    },
    "GetCurrentClientConnections": {
        "parent": "ISiteLicenseService",
        "service": true,
        "url": "https://api.steampowered.com/ISiteLicenseService/GetCurrentClientConnections/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "siteid",
                "type": "uint64",
                "required": false,
                "description": "Site ID to see; zero for all sites"
            }
        ]
    },
    "GetTotalPlaytime": {
        "parent": "ISiteLicenseService",
        "service": true,
        "url": "https://api.steampowered.com/ISiteLicenseService/GetTotalPlaytime/v1/",
        "method": "GET",
        "params": [
            {
                "name": "id",
                "type": "uint32",
                "description": "ID of game in the game_names section of the response"
            },
            {
                "name": "license_type",
                "type": "string",
                "description": "Playtime is divided up for each game by the type of license used. See the GetCurrentClientConnections section above for the list."
            },
            {
                "name": "playtime_seconds",
                "type": "uint32",
                "description": "total playtime for this game and license type, in seconds, for the requested period."
            }
        ]
    },
    "GetAppBetas": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/GetAppBetas/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID to get the betas of."
            }
        ]
    },
    "GetAppBuilds": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/GetAppBuilds/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID to get the build history of."
            },
            {
                "name": "count",
                "type": "uint32",
                "required": false,
                "description": "The number of builds to retrieve, the default is 10."
            }
        ]
    },
    "GetAppDepotVersions": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/GetAppDepotVersions/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID to get the depot versions for."
            }
        ]
    },
    "GetAppList": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://api.steampowered.com/ISteamApps/GetAppList/v2/",
        "method": "GET",
        "params": []
    },
    "GetPartnerAppListForWebAPIKey": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/GetPartnerAppListForWebAPIKey/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "type_filter",
                "type": "string",
                "required": false,
                "description": "Optional comma separated list of types to filter on"
            }
        ]
    },
    "GetPlayersBanned": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/GetPlayersBanned/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID of game"
            }
        ]
    },
    "GetServerList": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/GetServerList/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "filter",
                "type": "string",
                "required": false,
                "description": "Query filter string"
            },
            {
                "name": "limit",
                "type": "uint32",
                "required": false,
                "description": "Limit number of servers in the response"
            }
        ]
    },
    "GetServersAtAddress": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://api.steampowered.com/ISteamApps/GetServersAtAddress/v1/",
        "method": "GET",
        "params": [
            {
                "name": "addr",
                "type": "string",
                "required": true,
                "description": "IP or IP:queryport to list"
            }
        ]
    },
    "SetAppBuildLive": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamApps/SetAppBuildLive/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID of game"
            },
            {
                "name": "buildid",
                "type": "uint32",
                "required": true,
                "description": "BuildID"
            },
            {
                "name": "betakey",
                "type": "string",
                "required": true,
                "description": "beta key, required. Use public for default branch"
            },
            {
                "name": "description",
                "type": "string",
                "required": false,
                "description": "optional description for this build"
            }
        ]
    },
    "UpToDateCheck": {
        "parent": "ISteamApps",
        "service": false,
        "url": "https://api.steampowered.com/ISteamApps/UpToDateCheck/v1/",
        "method": "GET",
        "params": [
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID of game"
            },
            {
                "name": "version",
                "type": "uint32",
                "required": true,
                "description": "The installed version of the game"
            }
        ]
    },
    "ReportAbuse": {
        "parent": "ISteamCommunity",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamCommunity/ReportAbuse/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamidActor",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user doing the reporting"
            },
            {
                "name": "steamidTarget",
                "type": "uint64",
                "required": true,
                "description": "SteamID of the entity being accused of abuse"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID to check for ownership"
            },
            {
                "name": "abuseType",
                "type": "uint32",
                "required": true,
                "description": "Abuse type code (see EAbuseReportType enum)"
            },
            {
                "name": "contentType",
                "type": "uint32",
                "required": true,
                "description": "Content type code (see ECommunityContentType enum)"
            },
            {
                "name": "description",
                "type": "string",
                "required": true,
                "description": "Narrative from user"
            },
            {
                "name": "gid",
                "type": "uint64",
                "required": false,
                "description": "GID of related record (depends on content type)"
            }
        ]
    },
    "CanTrade": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamEconomy/CanTrade/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "That the key is associated with. Must be a steam economy app."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user attempting to initiate a trade"
            },
            {
                "name": "targetid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user that is the target of the trade invitation"
            }
        ]
    },
    "FinalizeAssetTransaction": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamEconomy/FinalizeAssetTransaction/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The app ID the user is buying assets for"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of the user making a purchase"
            },
            {
                "name": "txnid",
                "type": "string",
                "required": true,
                "description": "The transaction ID"
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "The local language for the user"
            }
        ]
    },
    "GetAssetClassInfo": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://api.steampowered.com/ISteamEconomy/GetAssetClassInfo/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "Must be a steam economy app."
            },
            {
                "name": "language",
                "type": "string",
                "required": false,
                "description": "The user's local language"
            },
            {
                "name": "class_count",
                "type": "uint32",
                "required": true,
                "description": "Number of classes requested. Must be at least one."
            },
            {
                "name": "classid0",
                "type": "uint64",
                "required": true,
                "description": "Class ID of the nth class."
            },
            {
                "name": "instanceid0",
                "type": "uint64",
                "required": false,
                "description": "Instance ID of the nth class."
            }
        ]
    },
    "GetAssetPrices": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "Must be a steam economy app."
            },
            {
                "name": "currency",
                "type": "string",
                "required": false,
                "description": "The currency to filter for"
            },
            {
                "name": "language",
                "type": "string",
                "required": false,
                "description": "The user's local language"
            }
        ]
    },
    "GetExportedAssetsForUser": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamEconomy/GetExportedAssetsForUser/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The app to get exported items from."
            },
            {
                "name": "contextid",
                "type": "uint64",
                "required": true,
                "description": "The context in the app to get exported items from."
            }
        ]
    },
    "GetMarketPrices": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamEconomy/GetMarketPrices/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "Must be a steam economy app."
            }
        ]
    },
    "StartAssetTransaction": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamEconomy/StartAssetTransaction/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The app ID the user is buying assets for"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user making a purchase"
            },
            {
                "name": "assetid0",
                "type": "string",
                "required": true,
                "description": "The ID of the first asset the user is buying - there must be at least one"
            },
            {
                "name": "assetquantity0",
                "type": "uint32",
                "required": true,
                "description": "The quantity of assetid0's the the user is buying"
            },
            {
                "name": "currency",
                "type": "string",
                "required": true,
                "description": "The local currency for the user"
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "The local language for the user"
            },
            {
                "name": "ipaddress",
                "type": "string",
                "required": true,
                "description": "The user's IP address"
            },
            {
                "name": "referrer",
                "type": "string",
                "required": false,
                "description": "The referring URL"
            },
            {
                "name": "clientauth",
                "type": "bool",
                "required": false,
                "description": "If true (default is false), the authorization will appear in the user's steam client overlay, rather than as a web page - useful for stores that are embedded in products."
            }
        ]
    },
    "StartTrade": {
        "parent": "ISteamEconomy",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamEconomy/StartTrade/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "That the key is associated with. Must be a steam economy app."
            },
            {
                "name": "partya",
                "type": "uint64",
                "required": true,
                "description": "SteamID of first user in the trade"
            },
            {
                "name": "partyb",
                "type": "uint64",
                "required": true,
                "description": "SteamID of second user in the trade"
            }
        ]
    },
    "GetGameServerPlayerStatsForGame": {
        "parent": "ISteamGameServerStats",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamGameServerStats/GetGameServerPlayerStatsForGame/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "gameid",
                "type": "uint64",
                "required": true,
                "description": "game id to get stats for, if not a mod, it's safe to use appid here"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of the game"
            },
            {
                "name": "rangestart",
                "type": "string",
                "required": true,
                "description": "range start date/time (Format: YYYY-MM-DD HH:MM:SS, Seattle local time)"
            },
            {
                "name": "rangeend",
                "type": "string",
                "required": true,
                "description": "range end date/time (Format: YYYY-MM-DD HH:MM:SS, Seattle local time)"
            },
            {
                "name": "maxresults",
                "type": "uint32",
                "required": false,
                "description": "Max number of results to return (up to 1000)"
            }
        ]
    },
    "DeleteLeaderboard": {
        "parent": "ISteamLeaderboards",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamLeaderboards/DeleteLeaderboard/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "name",
                "type": "string",
                "required": true,
                "description": "name of the leaderboard to delete"
            }
        ]
    },
    "FindOrCreateLeaderboard": {
        "parent": "ISteamLeaderboards",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamLeaderboards/FindOrCreateLeaderboard/v2/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "name",
                "type": "string",
                "required": true,
                "description": "name of the leaderboard to create"
            },
            {
                "name": "sortmethod",
                "type": "string",
                "required": false,
                "description": "sort method to use for this leaderboard (defaults to Ascending)"
            },
            {
                "name": "displaytype",
                "type": "string",
                "required": false,
                "description": "display type for this leaderboard (defaults to Numeric)"
            },
            {
                "name": "createifnotfound",
                "type": "bool",
                "required": false,
                "description": "if this is true the leaderboard will be created if it doesn't exist. Defaults to true."
            },
            {
                "name": "onlytrustedwrites",
                "type": "bool",
                "required": false,
                "description": "if this is true the leaderboard scores cannot be set by clients, and can only be set by publisher via SetLeaderboardScore WebAPI. Defaults to false."
            },
            {
                "name": "onlyfriendsreads",
                "type": "bool",
                "required": false,
                "description": "if this is true the leaderboard scores can only be read for friends by clients, scores can always be read by publisher. Defaults to false."
            }
        ]
    },
    "GetLeaderboardEntries": {
        "parent": "ISteamLeaderboards",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardEntries/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "rangestart",
                "type": "int32",
                "required": true,
                "description": "range start or 0"
            },
            {
                "name": "rangeend",
                "type": "int32",
                "required": true,
                "description": "range end or max LB entries"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": false,
                "description": "SteamID used for friend & around user requests"
            },
            {
                "name": "leaderboardid",
                "type": "int32",
                "required": true,
                "description": "ID of the leaderboard to view"
            },
            {
                "name": "datarequest",
                "type": "uint32",
                "required": true,
                "description": "type of request: RequestGlobal, RequestAroundUser, RequestFriends"
            }
        ]
    },
    "GetLeaderboardsForGame": {
        "parent": "ISteamLeaderboards",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardsForGame/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            }
        ]
    },
    "ResetLeaderboard": {
        "parent": "ISteamLeaderboards",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamLeaderboards/ResetLeaderboard/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "leaderboardid",
                "type": "uint32",
                "required": true,
                "description": "numeric ID of the target leaderboard. Can be retrieved from GetLeaderboardsForGame"
            }
        ]
    },
    "SetLeaderboardScore": {
        "parent": "ISteamLeaderboards",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamLeaderboards/SetLeaderboardScore/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "leaderboardid",
                "type": "uint32",
                "required": true,
                "description": "numeric ID of the target leaderboard. Can be retrieved from GetLeaderboardsForGame"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "steamID to set the score for"
            },
            {
                "name": "score",
                "type": "int32",
                "required": true,
                "description": "the score to set for this user"
            },
            {
                "name": "scoremethod",
                "type": "string",
                "required": true,
                "description": "update method to use. Can be \"KeepBest\" or \"ForceUpdate\""
            },
            {
                "name": "details",
                "type": "rawbinary",
                "required": false,
                "description": "game-specific details for how the score was earned. Up to 256 bytes."
            }
        ]
    },
    "AdjustAgreement": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/AdjustAgreement/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of the client that is adjusting the agreement."
            },
            {
                "name": "agreementid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit Steam billing agreement ID."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of the game the agreement is for."
            },
            {
                "name": "nextprocessdate",
                "type": "string",
                "required": true,
                "description": "Date that next recurring payment should be initiated. Format is YYYYMMDD.\nDate can only be adjusted forward indicating you want to add time to the subscription. If the date exceeds the end date of the subscription, the end date will be extended."
            }
        ]
    },
    "CancelAgreement": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/CancelAgreement/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of the client that is canceling the agreement."
            },
            {
                "name": "agreementid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit Steam billing agreement ID."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of the game the agreement is for."
            }
        ]
    },
    "FinalizeTxn": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/FinalizeTxn/v2/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "orderid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit ID for order"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID for game."
            }
        ]
    },
    "GetReport": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/GetReport/v5/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of game to get reports for."
            },
            {
                "name": "type",
                "type": "string",
                "required": false,
                "description": "Report type (One of: \"GAMESALES\", \"STEAMSTORESALES\", \"SETTLEMENT\", \"CHARGEBACK\")"
            },
            {
                "name": "time",
                "type": "string",
                "required": true,
                "description": "Start time of the report. (RFC 3339 UTC formatted like: 2010-01-01T00:00:00Z)"
            },
            {
                "name": "maxresults",
                "type": "uint32",
                "required": false,
                "description": "Maximum number of results to return in report. (Default is 1000 if no value is set)"
            }
        ]
    },
    "GetUserAgreementInfo": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/GetUserAgreementInfo/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of the client."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of the game the agreement is for."
            }
        ]
    },
    "GetUserInfo": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/GetUserInfo/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID of the game the user will make a purchase in."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": false,
                "description": "Steam ID of user making purchase."
            },
            {
                "name": "ipaddress",
                "type": "string",
                "required": false,
                "description": "IP address of user in string format (xxx.xxx.xxx.xxx). Only required if usersession in InitTxn was set to web."
            }
        ]
    },
    "InitTxn": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/InitTxn/v3/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "orderid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit ID for order"
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of user making purchase."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of game this transaction is for."
            },
            {
                "name": "itemcount",
                "type": "uint32",
                "required": true,
                "description": "Number of items in cart."
            },
            {
                "name": "language",
                "type": "string",
                "required": true,
                "description": "ISO 639-1 language code of the item descriptions. Only works with the 28 fully supported Steam languages. See supported languages"
            },
            {
                "name": "currency",
                "type": "string",
                "required": true,
                "description": "ISO 4217 currency code. See Supported Currencies for proper format of each currency."
            },
            {
                "name": "usersession",
                "type": "string",
                "required": false,
                "description": "Session where user will authorize the transaction. Valid options are \"client\" or \"web\". If this parameter is not supplied, the interface will be assumed to be through a currently logged in Steam client session."
            },
            {
                "name": "ipaddress",
                "type": "string",
                "required": false,
                "description": "IP address of user in string format (xxx.xxx.xxx.xxx). Only required if [param]usersession[/param] is set to web."
            },
            {
                "name": "itemid[0]",
                "type": "uint32",
                "required": true,
                "description": "3rd party ID for item."
            },
            {
                "name": "qty[0]",
                "type": "int16",
                "required": true,
                "description": "Quantity of this item."
            },
            {
                "name": "amount[0]",
                "type": "int64",
                "required": true,
                "description": "Total cost (in cents) of item(s) to be charged at this time. See Supported Currencies for proper format of each amount. Note that the amount you pass needs to be in the format that matches the \"currency\" code you pass."
            },
            {
                "name": "description[0]",
                "type": "string",
                "required": true,
                "description": "Description of item. Maximum length of 128 characters."
            },
            {
                "name": "category[0]",
                "type": "string",
                "required": false,
                "description": "Optional text description of a category that this item should be grouped with. This value is used for grouping sales data in backend Steam reporting and is never displayed to the user. Maximum length of 64 characters"
            },
            {
                "name": "associated_bundle[0]",
                "type": "uint32",
                "required": false,
                "description": "Optional bundleid of associated bundle."
            },
            {
                "name": "billingtype[0]",
                "type": "string",
                "required": false,
                "description": "Optional recurring billing type. Valid options are: \"Steam\" or \"Game\"\n\nSteam: Steam automatically re-bills\nGame: Partner needs to call ProcessAgreement API to bill"
            },
            {
                "name": "startdate[0]",
                "type": "string",
                "required": false,
                "description": "Optional start date for recurring billing (RFC 3339 UTC formatted like: 2010-01-01T00:00:00Z)."
            },
            {
                "name": "enddate[0]",
                "type": "string",
                "required": false,
                "description": "Optional end date for recurring billing (RFC 3339 UTC formatted like: 2010-01-01T00:00:00Z)."
            },
            {
                "name": "period[0]",
                "type": "string",
                "required": false,
                "description": "Optional period for recurring billing. Valid options are: \"Day\", \"Week\", \"Month\", \"Year\""
            },
            {
                "name": "frequency[0]",
                "type": "uint32",
                "required": false,
                "description": "Optional frequency (in number of days) for recurring billing. Supported values: 1 - 255"
            },
            {
                "name": "recurringamt[0]",
                "type": "int64",
                "required": false,
                "description": "Optional amount to be billed for future recurring billing transactions."
            },
            {
                "name": "bundlecount",
                "type": "uint32",
                "required": false,
                "description": "Number of bundles in cart."
            },
            {
                "name": "bundleid[0]",
                "type": "uint32",
                "required": false,
                "description": "3rd party ID of the bundle. This shares the same ID space as 3rd party items."
            },
            {
                "name": "bundle_qty[0]",
                "type": "uint32",
                "required": false,
                "description": "Quantity of this bundle."
            },
            {
                "name": "bundle_desc[0]",
                "type": "string",
                "required": false,
                "description": "Description of bundle. Maximum length of 128 characters."
            },
            {
                "name": "bundle_category[0]",
                "type": "string",
                "required": false,
                "description": "Optional text description of a bundle category that this item should be grouped with. This value is used for grouping sales data in backend Steam reporting and is never displayed to the user. Maximum length of 64 characters."
            }
        ]
    },
    "ProcessAgreement": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/ProcessAgreement/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "orderid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit ID for order. If the recurring subscription was initiated from the Steam store, then this field will be 0."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of the client."
            },
            {
                "name": "agreementid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit Steam billing agreement ID."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of the game the agreement is for."
            },
            {
                "name": "amount",
                "type": "int32",
                "required": true,
                "description": "Total cost (in cents).\n\nThis value corresponds to an initial one-time amount to be immediately charged to a user."
            },
            {
                "name": "currency",
                "type": "string",
                "required": true,
                "description": "ISO 4217 currency code of prices"
            }
        ]
    },
    "QueryTxn": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/QueryTxn/v3/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of game this transaction is for."
            },
            {
                "name": "orderid",
                "type": "uint64",
                "required": false,
                "description": "Unique 64-bit ID for order."
            },
            {
                "name": "transid",
                "type": "uint64",
                "required": false,
                "description": "Unique 64-bit Steam transaction ID."
            }
        ]
    },
    "RefundTxn": {
        "parent": "ISteamMicroTxn",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamMicroTxn/RefundTxn/v2/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "orderid",
                "type": "uint64",
                "required": true,
                "description": "Unique 64-bit ID for order to refund."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "App ID of the game."
            }
        ]
    },
    "GetNewsForApp": {
        "parent": "ISteamNews",
        "service": false,
        "url": "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/",
        "method": "GET",
        "params": [
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID to retrieve news for"
            },
            {
                "name": "maxlength",
                "type": "uint32",
                "required": false,
                "description": "Maximum length for the content to return, if this is 0 the full content is returned, if it's less then a blurb is generated to fit."
            },
            {
                "name": "enddate",
                "type": "uint32",
                "required": false,
                "description": "Retrieve posts earlier than this date (unix epoch timestamp)"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": false,
                "description": "# of posts to retrieve (default 20)"
            },
            {
                "name": "feeds",
                "type": "string",
                "required": false,
                "description": "Comma-seperated list of feed names to return news for"
            }
        ]
    },
    "GetNewsForAppAuthed": {
        "parent": "ISteamNews",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamNews/GetNewsForAppAuthed/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID to retrieve news for"
            },
            {
                "name": "maxlength",
                "type": "uint32",
                "required": false,
                "description": "Maximum length for the content to return, if this is 0 the full content is returned, if it's less then a blurb is generated to fit."
            },
            {
                "name": "enddate",
                "type": "uint32",
                "required": false,
                "description": "Retrieve posts earlier than this date (unix epoch timestamp)"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": false,
                "description": "# of posts to retrieve (default 20)"
            },
            {
                "name": "feeds",
                "type": "string",
                "required": false,
                "description": "Comma-seperated list of feed names to return news for"
            }
        ]
    },
    "RankedByPublicationOrder": {
        "parent": "ISteamPublishedItemSearch",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamPublishedItemSearch/RankedByPublicationOrder/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "startidx",
                "type": "uint32",
                "required": true,
                "description": "Starting index in the result set (0 based)"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Number Requested"
            },
            {
                "name": "tagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of Tags Specified"
            },
            {
                "name": "usertagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of User specific tags requested"
            },
            {
                "name": "hasappadminaccess",
                "type": "bool",
                "required": false,
                "description": "Whether the user making the request is an admin for the app and can see private files"
            },
            {
                "name": "fileType",
                "type": "uint32",
                "required": false,
                "description": "EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items"
            },
            {
                "name": "tag[0]",
                "type": "string",
                "required": false,
                "description": "Tag to filter result set"
            },
            {
                "name": "usertag[0]",
                "type": "string",
                "required": false,
                "description": "A user specific tag"
            }
        ]
    },
    "RankedByTrend": {
        "parent": "ISteamPublishedItemSearch",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamPublishedItemSearch/RankedByTrend/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "startidx",
                "type": "uint32",
                "required": true,
                "description": "Starting index in the result set (0 based)"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Number Requested"
            },
            {
                "name": "tagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of Tags Specified"
            },
            {
                "name": "usertagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of User specific tags requested"
            },
            {
                "name": "hasappadminaccess",
                "type": "bool",
                "required": false,
                "description": "Whether the user making the request is an admin for the app and can see private files"
            },
            {
                "name": "fileType",
                "type": "uint32",
                "required": false,
                "description": "EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items"
            },
            {
                "name": "days",
                "type": "uint32",
                "required": false,
                "description": "[1,7] number of days for the trend period, including today"
            },
            {
                "name": "tag[0]",
                "type": "string",
                "required": false,
                "description": "Tag to filter result set"
            },
            {
                "name": "usertag[0]",
                "type": "string",
                "required": false,
                "description": "A user specific tag"
            }
        ]
    },
    "RankedByVote": {
        "parent": "ISteamPublishedItemSearch",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamPublishedItemSearch/RankedByVote/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "startidx",
                "type": "uint32",
                "required": true,
                "description": "Starting index in the result set (0 based)"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Number Requested"
            },
            {
                "name": "tagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of Tags Specified"
            },
            {
                "name": "usertagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of User specific tags requested"
            },
            {
                "name": "hasappadminaccess",
                "type": "bool",
                "required": false,
                "description": "Whether the user making the request is an admin for the app and can see private files"
            },
            {
                "name": "fileType",
                "type": "uint32",
                "required": false,
                "description": "EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items"
            },
            {
                "name": "tag[0]",
                "type": "string",
                "required": false,
                "description": "Tag to filter result set"
            },
            {
                "name": "usertag[0]",
                "type": "string",
                "required": false,
                "description": "A user specific tag"
            }
        ]
    },
    "ResultSetSummary": {
        "parent": "ISteamPublishedItemSearch",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamPublishedItemSearch/ResultSetSummary/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint64",
                "required": true,
                "description": "appID relevant to all subsequent tags"
            },
            {
                "name": "tagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of Tags Specified"
            },
            {
                "name": "usertagcount",
                "type": "uint32",
                "required": true,
                "description": "Number of User specific tags requested"
            },
            {
                "name": "hasappadminaccess",
                "type": "bool",
                "required": false,
                "description": "Whether the user making the request is an admin for the app and can see private files"
            },
            {
                "name": "fileType",
                "type": "uint32",
                "required": false,
                "description": "EPublishedFileInfoMatchingFileType, defaults to k_PFI_MatchingFileType_Items"
            },
            {
                "name": "tag[0]",
                "type": "string",
                "required": false,
                "description": "Tag to filter result set"
            },
            {
                "name": "usertag[0]",
                "type": "string",
                "required": false,
                "description": "A user specific tag"
            }
        ]
    },
    "ItemVoteSummary": {
        "parent": "ISteamPublishedItemVoting",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamPublishedItemVoting/ItemVoteSummary/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Count of how many items we are querying"
            },
            {
                "name": "publishedfileid[0]",
                "type": "uint64",
                "required": false,
                "description": "The Published File ID who's vote details are required"
            }
        ]
    },
    "UserVoteSummary": {
        "parent": "ISteamPublishedItemVoting",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamPublishedItemVoting/UserVoteSummary/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Steam ID of user"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Count of how many items we are querying"
            },
            {
                "name": "publishedfileid[0]",
                "type": "uint64",
                "required": false,
                "description": "A Specific Published Item"
            }
        ]
    },
    "EnumerateUserSubscribedFiles": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamRemoteStorage/EnumerateUserSubscribedFiles/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "listtype",
                "type": "uint32",
                "required": false,
                "description": "EUCMListType"
            }
        ]
    },
    "GetCollectionDetails": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/",
        "method": "POST",
        "params": [
            {
                "name": "collectioncount",
                "type": "uint32",
                "required": true,
                "description": "Number of collections being requested"
            },
            {
                "name": "publishedfileids[0]",
                "type": "uint64",
                "required": true,
                "description": "collection ids to get the details for"
            }
        ]
    },
    "GetPublishedFileDetails": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/",
        "method": "POST",
        "params": [
            {
                "name": "itemcount",
                "type": "uint32",
                "required": true,
                "description": "Number of items being requested"
            },
            {
                "name": "publishedfileids[0]",
                "type": "uint64",
                "required": true,
                "description": "published file id to look up"
            }
        ]
    },
    "GetUGCFileDetails": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://api.steampowered.com/ISteamRemoteStorage/GetUGCFileDetails/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": false,
                "description": "If specified, only returns details if the file is owned by the SteamID specified"
            },
            {
                "name": "ugcid",
                "type": "uint64",
                "required": true,
                "description": "ID of UGC file to get info for"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            }
        ]
    },
    "SetUGCUsedByGC": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamRemoteStorage/SetUGCUsedByGC/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "ugcid",
                "type": "uint64",
                "required": true,
                "description": "ID of UGC file whose bits are being fiddled with"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product to change updating state for"
            },
            {
                "name": "used",
                "type": "bool",
                "required": true,
                "description": "New state of flag"
            }
        ]
    },
    "SubscribePublishedFile": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamRemoteStorage/SubscribePublishedFile/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "publishedfileid",
                "type": "uint64",
                "required": true,
                "description": "published file id to subscribe to"
            }
        ]
    },
    "UnsubscribePublishedFile": {
        "parent": "ISteamRemoteStorage",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamRemoteStorage/UnsubscribePublishedFile/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appID of product"
            },
            {
                "name": "publishedfileid",
                "type": "uint64",
                "required": true,
                "description": "published file id to unsubscribe from"
            }
        ]
    },
    "AuthenticateUser": {
        "parent": "ISteamUserAuth",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUserAuth/AuthenticateUser/v1/",
        "method": "POST",
        "params": [
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "Should be the users steamid, unencrypted."
            },
            {
                "name": "sessionkey",
                "type": "rawbinary",
                "required": true,
                "description": "Should be a 32 byte random blob of data, which is then encrypted with RSA using the Steam system's public key. Randomness is important here for security."
            },
            {
                "name": "encrypted_loginkey",
                "type": "rawbinary",
                "required": true,
                "description": "Should be the users hashed loginkey, AES encrypted with the sessionkey."
            }
        ]
    },
    "AuthenticateUserTicket": {
        "parent": "ISteamUserAuth",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUserAuth/AuthenticateUserTicket/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "ticket",
                "type": "string",
                "required": true,
                "description": "Convert the binary ticket data from GetAuthTicketForWebApi into a hexadecimal string and pass that string in as this parameter."
            },
            {
                "name": "identity",
                "type": "string",
                "required": true,
                "description": "Identifying string passed as a parameter to GetAuthTicketForWebApi when the ticket was created, used to identify the entity calling this webapi. If this identity string is passed, only tickets created with that parameter will successfully authenticate."
            }
        ]
    },
    "CheckAppOwnership": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/CheckAppOwnership/v2/",
        "method": "GET",
        "params": [
            {
                "name": "ownsapp",
                "type": "bool",
                "description": "Indicates if the user is the actual owner or the app."
            },
            {
                "name": "permanent",
                "type": "bool",
                "description": "Whether the user permanetly owns your app. Not true for ownership via Family Sharing, free weekends, or site license"
            },
            {
                "name": "timestamp",
                "type": "string",
                "description": "Time that the app was acquired."
            },
            {
                "name": "ownersteamid",
                "type": "uint64",
                "description": "Indicates the true owner of the app."
            },
            {
                "name": "sitelicense",
                "type": "bool",
                "description": "Indicates if user is borrowing this license from a PC Cafe site."
            }
        ]
    },
    "GetAppPriceInfo": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetAppPriceInfo/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appids",
                "type": "string",
                "required": true,
                "description": "Comma-delimited list of appids (max: 100)"
            }
        ]
    },
    "GetDeletedSteamIDs": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetDeletedSteamIDs/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "rowversion",
                "type": "uint64",
                "required": true,
                "description": "An unsigned 64-bit value used to page through deleted accounts. Pass 0 when calling this API for the first time, then pass the value returned from the previous call for each additional request. This value will need to be stored on your server for future calls."
            }
        ]
    },
    "GetFriendList": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetFriendList/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "relationship",
                "type": "string",
                "required": false,
                "description": "relationship type (ex: friend)"
            }
        ]
    },
    "GetPlayerBans": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetPlayerBans/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamids",
                "type": "string",
                "required": true,
                "description": "Comma-delimited list of SteamIDs"
            }
        ]
    },
    "GetPlayerSummaries": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetPlayerSummaries/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamids",
                "type": "string",
                "required": true,
                "description": "Comma-delimited list of SteamIDs (max: 100)"
            }
        ]
    },
    "GetPublisherAppOwnership": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetPublisherAppOwnership/v3/",
        "method": "GET",
        "params": [
            {
                "name": "appid",
                "type": "uint32",
                "description": "AppID associated with your WebAPI key"
            },
            {
                "name": "ownsapp",
                "type": "bool",
                "description": "Whether the user currently owns your app. Will be true for ownership via purchases, CD-keys, Family Sharing, free weekends, and site license"
            },
            {
                "name": "permanent",
                "type": "bool",
                "description": "Whether the user permanetly owns your app. Not true for ownership via Family Sharing, free weekends, or site license"
            },
            {
                "name": "timestamp",
                "type": "string",
                "description": "GMT time for when the user first accquired the appID"
            },
            {
                "name": "ownersteamid",
                "type": "uint64",
                "description": "SteamID for the actual owner. If the app is owned via Family Sharing, ownersteamid will be the actual owner. Otherwise will be the same steamID passed in"
            },
            {
                "name": "sitelicense",
                "type": "bool",
                "description": "Indicates if user is borrowing this license from a commercial site"
            }
        ]
    },
    "GetPublisherAppOwnershipChanges": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetPublisherAppOwnershipChanges/v1/",
        "method": "GET",
        "params": [
            {
                "name": "steamids/steamid",
                "type": "string",
                "description": "The list of SteamIDs for any accounts that have changed since the provided row versions. Up to 10,000 SteamIDs will be returned per call."
            },
            {
                "name": "packagerowversion",
                "type": "string",
                "description": "The package row version that matches the last SteamID returned. Store this for future calls to GetPublisherAppOwnershipChanges"
            },
            {
                "name": "cdkeyrowversion",
                "type": "string",
                "description": "The cd key row version that matches the last SteamID returned. Store this for future calls to GetPublisherAppOwnershipChanges"
            },
            {
                "name": "moredata",
                "type": "bool",
                "description": "Indicates if more and newer data is available."
            }
        ]
    },
    "GetUserGroupList": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/GetUserGroupList/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            }
        ]
    },
    "ResolveVanityURL": {
        "parent": "ISteamUser",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUser/ResolveVanityURL/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "vanityurl",
                "type": "string",
                "required": true,
                "description": "The vanity URL to get a SteamID for"
            },
            {
                "name": "url_type",
                "type": "int32",
                "required": false,
                "description": "The type of vanity URL. 1 (default): Individual profile, 2: Group, 3: Official game group"
            }
        ]
    },
    "GetGlobalAchievementPercentagesForApp": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/",
        "method": "GET",
        "params": [
            {
                "name": "gameid",
                "type": "uint64",
                "required": true,
                "description": "GameID to retrieve the achievement percentages for"
            }
        ]
    },
    "GetGlobalStatsForGame": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/",
        "method": "GET",
        "params": [
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID that we're getting global stats for"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Number of stats get data for"
            },
            {
                "name": "name[0]",
                "type": "string",
                "required": true,
                "description": "Names of stat to get data for"
            },
            {
                "name": "startdate",
                "type": "uint32",
                "required": false,
                "description": "Start date for daily totals (unix epoch timestamp)"
            },
            {
                "name": "enddate",
                "type": "uint32",
                "required": false,
                "description": "End date for daily totals (unix epoch timestamp)"
            }
        ]
    },
    "GetNumberOfCurrentPlayers": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/",
        "method": "GET",
        "params": [
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID that we're getting user count for"
            }
        ]
    },
    "GetPlayerAchievements": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "AppID to get achievements for"
            },
            {
                "name": "l",
                "type": "string",
                "required": false,
                "description": "Language to return strings for"
            }
        ]
    },
    "GetSchemaForGame": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "l",
                "type": "string",
                "required": false,
                "description": "localized language to return (english, french, etc.)"
            }
        ]
    },
    "GetUserStatsForGame": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API user authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            }
        ]
    },
    "SetUserStatsForGame": {
        "parent": "ISteamUserStats",
        "service": false,
        "url": "https://partner.steam-api.com/ISteamUserStats/SetUserStatsForGame/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "steamid",
                "type": "uint64",
                "required": true,
                "description": "SteamID of user"
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "appid of game"
            },
            {
                "name": "count",
                "type": "uint32",
                "required": true,
                "description": "Number of stats and achievements to set a value for (name/value param pairs)"
            },
            {
                "name": "name[0]",
                "type": "string",
                "required": true,
                "description": "Name of stat or achievement to set"
            },
            {
                "name": "value[0]",
                "type": "uint32",
                "required": true,
                "description": "Value to set"
            }
        ]
    },
    "GetServerInfo": {
        "parent": "ISteamWebAPIUtil",
        "service": false,
        "url": "https://api.steampowered.com/ISteamWebAPIUtil/GetServerInfo/v1/",
        "method": "GET",
        "params": []
    },
    "GetSupportedAPIList": {
        "parent": "ISteamWebAPIUtil",
        "service": false,
        "url": "https://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": false,
                "description": "The Steamworks Web API authentication key which is required to receive restricted methods."
            }
        ]
    },
    "SetItemPaymentRules": {
        "parent": "IWorkshopService",
        "service": true,
        "url": "https://partner.steam-api.com/IWorkshopService/SetItemPaymentRules/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID that the item belongs to."
            },
            {
                "name": "gameitemid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "associated_workshop_files",
                "type": "string",
                "required": true,
                "description": ""
            },
            {
                "name": "partner_accounts",
                "type": "string",
                "required": true,
                "description": ""
            },
            {
                "name": "validate_only",
                "type": "bool",
                "required": false,
                "description": "Only validates the rules and does not persist them."
            },
            {
                "name": "make_workshop_files_subscribable",
                "type": "bool",
                "required": true,
                "description": "Allow users to subscribe to the workshop items?"
            }
        ]
    },
    "GetFinalizedContributors": {
        "parent": "IWorkshopService",
        "service": true,
        "url": "https://partner.steam-api.com/IWorkshopService/GetFinalizedContributors/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID that the item belongs to."
            },
            {
                "name": "gameitemid",
                "type": "uint32",
                "required": true,
                "description": ""
            }
        ]
    },
    "GetItemDailyRevenue": {
        "parent": "IWorkshopService",
        "service": true,
        "url": "https://partner.steam-api.com/IWorkshopService/GetItemDailyRevenue/v1/",
        "method": "GET",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": "The App ID that the item belongs to."
            },
            {
                "name": "item_id",
                "type": "uint32",
                "required": true,
                "description": "The Workshop item ID to get the revenue of."
            },
            {
                "name": "date_start",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "date_end",
                "type": "uint32",
                "required": true,
                "description": ""
            }
        ]
    },
    "PopulateItemDescriptions": {
        "parent": "IWorkshopService",
        "service": true,
        "url": "https://partner.steam-api.com/IWorkshopService/PopulateItemDescriptions/v1/",
        "method": "POST",
        "params": [
            {
                "name": "key",
                "type": "string",
                "required": true,
                "description": "Steamworks Web API publisher authentication key."
            },
            {
                "name": "appid",
                "type": "uint32",
                "required": true,
                "description": ""
            },
            {
                "name": "languages",
                "type": "string",
                "required": true,
                "description": ""
            }
        ]
    }
}

// MAKE INDEX.JS //
/*
let script = 'class API {'
Object.keys(endpoints).forEach(name => {
    const endpoint = endpoints[name]
    endpoint.params = endpoint.params.sort((a, b) => b.required - a.required)

    let auth = endpoint.params.find(param => param.name == 'key' && param.description.includes('Steamworks Web API'))
    if (auth) {
        auth = auth.description.includes('publisher') ? 'publisher' : 'user'
        endpoint.params = endpoint.params.filter(param => param.name !== 'key')
    }
    
    script += `
    /**
    ${endpoint.params.map(param => ` * @param {${param.type ? {
        string: 'string',
        'uint32': 'number',
        'JSON array': 'object[]',
        'int32': 'number',
        'uint64': 'number',
        'uint64 array': 'number[]',
        int64: 'number',
        int16: 'number',
        bool: 'boolean',
        'uint64[]': 'number[]',
        'rawbinary': 'number'
    }[param.type] : 'string'}} ${param.required ? param.name.replaceAll('[0]', '') : `[${param.name?.replaceAll('[0]', '')}]`} ${param.description}`).join('\n    ')}
     *\/
    ${name.charAt(0).toLowerCase() + name.slice(1)} = (${endpoint.params.map(param => param.name?.replaceAll('[0]', '')).join(', ')}) => this.request('${endpoint.url}', ${endpoint.params.length ? `{ ${endpoint.params.map(param => param.name?.replaceAll('[0]', '')).join(', ')} }` : '{}'}, '${endpoint.method}', ${endpoint.service}${auth ? `, '${auth}'` : ''})`
})

require('node:fs').writeFileSync('./api.js', script)
*/