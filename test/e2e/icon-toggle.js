var base = 'http://localhost:' + (process.env.PORT || 8080) + '/test';

base += '/#icon-toggle';
var mdlCbSelector = 'label[for=it]';

module.exports = {
  'icon-toggle exists': function(browser) {
    browser.url(base)
      .waitForElementVisible('#test', 1000)
      .expect.element('#it')
      .to.be.present
      .and.to.be.an('input')
      .and.to.have.attribute('type')
      .equals('checkbox');

  },
  'icon-toggle has mdl classes': function(browser) {
    browser.expect.element('#it')
      .to.have.attribute('class')
      .equals('mdl-icon-toggle__input');
    browser.expect.element('label[for=it] i:nth-child(2)')
      .and.to.have.attribute('class')
      .contains('mdl-icon-toggle__label');
  },
  'icon-toggle is checked': function(browser) {
    browser.expect.element('#it')
      .to.be.selected;
  },
  'icon-toggle can be unchecked': function(browser) {
    browser.click(mdlCbSelector)
      .expect.element('#it').to.not.be.selected;
    browser.click(mdlCbSelector)
      .expect.element('#it').to.be.selected;
  },
  'icon-toggle have is-checked class': function(browser) {
    browser.click(mdlCbSelector)
      .expect.element(mdlCbSelector).to.not.be.selected;

    browser.expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.does.not.contain('is-checked');

    browser.click(mdlCbSelector)
      .expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.contains('is-checked');
  },
  'icon-toggle can be unchecked from somewhere else': function(browser) {
    var selector = '#classic';
    browser.expect.element('#it').to.be.selected;
    browser.expect.element(selector).to.be.selected;
    browser.click(selector)
      .expect.element('#it').to.not.be.selected;

    browser.expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.does.not.contain('is-checked');

    browser.click(selector)
      .expect.element('#it').to.be.selected;

    browser.expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.contains('is-checked');
  },
  'icon-toggle can be disabled': function(browser) {
    var selector = '#disable';
    browser.expect.element('#it').to.be.enabled;
    browser.expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.does.not.contain('is-disabled');

    browser.click(selector)
      .expect.element('#it').to.not.be.enabled;

    browser.expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.contains('is-disabled');
  },
  'icon-toggle cannot be used while disabled': function(browser) {
    var selector = '#disable';
    browser.expect.element('#it').to.not.be.enabled;

    browser.click('#it')
      .expect.element('#it').to.be.selected;
    browser.click('#it')
      .expect.element('#it').to.be.selected;

    browser.click(selector)
      .expect.element('#it').to.be.enabled;

    browser.expect.element(mdlCbSelector)
      .to.have.attribute('class')
      .which.does.not.contain('is-disabled');
  },
  'icon-toggle keep working after being disabled': function(browser) {
    browser.click(mdlCbSelector)
      .expect.element('#it').to.not.be.selected;
    browser.click(mdlCbSelector)
      .expect.element('#it').to.be.selected;
  },
  'dynamically added elements should be upgraded': function(browser) {
    browser.click('#disable')
      .expect.element('label[for=v-if]')
      .to.be.present
      .and.to.have.attribute('class')
      .which.contains('is-upgraded');
  },
  'dynamically added elements should have the correct value': function(browser) {
    browser.expect.element('#v-if')
      .to.be.selected;

    browser.click('#disable')
      .expect.element('#v-if').to.not.be.present;
  },
  'added classes exist': function(browser) {
    browser.expect.element('label[for=it]')
      .to.have.attribute('class')
      .which.contains('added-class');
  },
  'icon can change': function(browser) {
    browser.expect.element('label[for=dit] i:nth-child(2)')
      .text.to.equal('code');
    browser.clearValue('#dit-val')
      .setValue('#dit-val', 'http');
    browser.expect.element('label[for=dit] i:nth-child(2)')
      .text.to.equal('http');
  },
  'checkboxes can use an Array instead of a Boolean': function(browser) {
    var selector = function(n) {
      return 'label[for=id-' + n + ']';
    };
    browser.expect.element('#its')
      .text.to.equal('[]');

    browser.click(selector(0))
      .expect.element('#its')
      .text.to.equal('[ "id-0" ]');

    browser.click(selector(1))
      .expect.element('#its')
      .text.to.equal('[ "id-0", "id-1" ]');

    browser.click(selector(0))
      .expect.element('#its')
      .text.to.equal('[ "id-1" ]');

    browser.click(selector(2))
      .expect.element('#its')
      .text.to.equal('[ "id-1", "id-2" ]');

    browser.click(selector(2))
      .click(selector(1))
      .expect.element('#its')
      .text.to.equal('[]');
  },
  'teardown': function(browser) {
    browser.end();
  }
};
