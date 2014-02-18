goog.provide('hiddencloud.Button');

goog.require('lime.GlossyButton');

/**
 * Glossy button. Rounded button with some predefined style.
 * Use lime.Button for lower level control.
 * @param {string} txt Text shown on the button.
 * @constructor
 * @extends lime.Button
 */
hiddencloud.Button = function(txt) {
    lime.GlossyButton.call(this, txt);

    // this.borderWidth = 4;
    this.borderWidth = 4;
    this.setColor('#000');
};
goog.inherits(hiddencloud.Button, lime.GlossyButton);

/**
 * Make state for a button.
 * @private
 * @return {lime.RoundedRect} state.
 */
hiddencloud.Button.prototype.makeState_ = function() {
    var state = new lime.RoundedRect().setFill('#8c0000').setRadius(15);
    state.inner = new lime.RoundedRect().setRadius(15);
    state.label = new lime.Label().setAlign('center').setFontColor('#eef').setFontSize(20).setSize(250, 20);

    state.appendChild(state.inner);
    state.inner.appendChild(state.label);
    return state;
};

/**
 * Set button base color
 * @param {mixed} clr New base color.
 * @return {lime.GlossyButton} object itself.
 */
hiddencloud.Button.prototype.setColor = function(clr) {
    clr = lime.fill.parse(clr);
    goog.array.forEach([this.upstate, this.downstate], function(s) {
        var c = s == this.downstate ? clr.clone().addSaturation(.1) : clr;
        var c = s == this.downstate ? clr.clone().addSaturation(.1) : clr;
        //s.setFill(c);
        var c2 = c.clone().addSaturation(.3);
        var grad = new lime.fill.LinearGradient().setDirection(0, 0, 0, 1);
        // grad.addColorStop(0, c2);
        grad.addColorStop(.45, c);
        grad.addColorStop(.55, c);
        // grad.addColorStop(1, c2);
        s.inner.setFill(grad);
    },this);
    return this;
};

/**
 * Set button text.
 * @param {string} txt Text.
 * @return {lime.GlossyButton} object itself.
 */
hiddencloud.Button.prototype.setFontSize = function(num) {
    this.upstate.label.setFontSize(num);
    this.downstate.label.setFontSize(num);
    return this;
};

hiddencloud.Button.prototype.setFontFamily = function(ff) {
    this.upstate.label.setFontFamily(ff);
    this.downstate.label.setFontFamily(ff);
    return this;
};

hiddencloud.Button.prototype.setBorderWidth = function(num) {
    this.borderWidth = num;
    return this;
};

hiddencloud.Button.prototype.setBorderColor = function(clr) {
    clr = lime.fill.parse(clr);
    this.upstate.label.setFill(clr)
    this.downstate.label.setFill(clr);
    return this;
}