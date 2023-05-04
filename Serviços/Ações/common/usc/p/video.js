if ( !window.USC ) { window.USC = {}; }

export async function cloudflareVideo() {
    const elements = document.querySelectorAll( 'video[src$="m3u8"],source[src$="m3u8"]' );
    console.log( 'cloudflareVideo() - ' + elements.length );
    if ( !elements.length ) {
        return;
    }
    if ( !window.Hls ) {
        await import( `/common/usc/p/hls.min.js` );
        if ( !window.Hls ) {
            throw new Error( "Unable to load HLS script" );
        }
    }

    for ( const el of elements ) {
        const videoSrc = el.getAttribute( 'src' );
        const video = el.closest( 'video' );
        if (// Make sure we have a video element.
            !video ||
            // And we didn't already init the HLS component.
            video.$cloudFlare ||
            // Skip if the browser can natively play this stream.
            video.canPlayType( 'application/vnd.apple.mpegurl' ) ) {
            continue;
        }

        // Create and bind the HLS to this video element.
        const hls = new Hls();
        hls.loadSource( videoSrc );
        hls.attachMedia( video );
        video.$cloudFlare = hls;
    }
}

window.USC.cloudflareVideo = cloudflareVideo;