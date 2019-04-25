"use strict";var module1=module;module1.export({default:()=>Dummy});var Module;module1.link('./module',{default(v){Module=v}},0);/**
 * Dummy module which is called on the renderer process startup, so that the Module can save a
 * reference to the renderer.
 *
 * @type {Module}
 */



const dummy = new Module('dummyModule');

// Nothing to do here since Module is already setting this reference for us.
dummy.on('setRendererReference', Function.prototype);

function Dummy() {}
