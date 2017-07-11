'use strict';

const
    os         = require( 'os' ),
    interfaces = os.networkInterfaces();

let version, internal;

function getMyIP( version, internal ) {
    version  = version || 'IPv4';
    internal = internal || false;

    for( const key in interfaces ) {
        const addresses = interfaces[ key ];
        for( let i = 0; i < addresses.length; i++ ) {
            const address = addresses[ i ];

            if( address.internal === internal && address.family === version ) {
                return address.address;
            }
        }
    }
    return 'localhost';
}

if( !module.parent ) {
    version    = 'IPv4';
    internal   = false;
    let
        argv   = process.argv,
        length = argv.length;

    if( length >= 3 ) {
        for( let i = 2; i < length; i++ ) {
            if( argv[ i ] === '--version6' || argv[ i ] === '-v6' )
                version = 'IPv6';
            else if( argv[ i ] === '--internal' || argv[ i ] === '-i' )
                internal = true;
        }
    }

    return getMyIP( version, internal );
} else {
    module.exports = getMyIP;
}