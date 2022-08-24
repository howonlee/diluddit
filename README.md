# Diluddit

Dilution of reddit. By 'dilution' I mean injection of latency, see [this](https://howonlee.github.io/2020/02/12/I-20Add-2020-20Seconds-20of-20Latency-20to-20Every-20Website-20I-20Visit.html). Browser extensions work well on your laptop but on mobile the dilution gets quite annoying, especially if you don't control the network. But if you create a simple mobile-web client for reddit while adding the latency those problems are less problematic, inasmuch as people have more control over the web proper.

I haven't implemented the usual NSFW filtering and warning stuff yet, so caveat usuario. I'm not responsible for like 5-25% of reddit being a cesspool and much of the rest being mediocrity, it's probably statistical physics's fault. Go ask a SFI peep

A lot of stuff is hardcoded to the idiosyncrasies of how I like stuff. If you want to de-hardcode it PR's are welcome.

I won't add auth and posting (anything that makes me deal with CORS), tho, so don't ask. I also actually like karma being invisible forever and the subreddit view on `new` without options. Fork if you want to.

Not an official reddit project. No affiliation with reddit in any way, shape or form whatsoever. MIT licensed. This is not a serious project, but I am actually using it, so contributions will be accepted and dealt with completely arbitrarily and in an arbitrarily procrastinatory manner.

Devmode is `npm start`, tests are `npm test`, build is `npm run build`
