'use strict';

describe('wsSeed.version module', function() {
  beforeEach(module('wsSeed.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
