self.__scramjet$config = {
    prefix: '/scram/',
    // You must use a Wisp or Bare server for static hosting
    // This is a sample public server; replace if it goes down
    codec: scramjet.codecs.xor,
    config: '/scramjet/scram.config.js',
    bundle: '/scramjet/scram.bundle.js',
    worker: '/scramjet/scram.worker.js',
    client: '/scramjet/scram.client.js',
    handler: '/scramjet/scram.handler.js',
    // Using a Wisp server is recommended for Scramjet
    wisp: 'wss://wisp.mercurywork.shop/' 
};
