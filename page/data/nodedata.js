
function NodeData(node) {
    this._node = node;
}

function SpriteData(node) {
    this._node = node;
}

function LabelData(node) {
    this._node = node;
}

function WidgetData(node) {
    this._node = node;
}

function SliderData(node) {
    this._node = node;
}

function FixNodeHor(node, step) {
    node.x += step;
    if(node.left) {
        node.left += step; 
    }
    if(node.right) {
        node.right -= step;
    } 
}

function FixNodeVer(node, step) {
    node.y += step;
    if(node.top) {
        node.top -= step; 
    }
    if(node.bottom) {
        node.right += step;
    }
}

function NodePropChange(node, prop, newValue) {
    if(prop == "x") {
        let step = newValue - node[prop];
        FixNodeHor(node, step);
    } else if(prop == "y") {
        let step = newValue - node[prop];
        FixNodeVer(node, step);
    } else {
        node[prop] = newValue;
    }
}

NodeData.prototype = {
    get uuid() {
        return this._node.uuid;
    },
    get position() {
        let t = typeof this._node.x;
        return {
            path: "position",
            type: "vec2",
            name: "Position",
            attrs: {
                min: 1,
                max: 100,
            },
            value: {
                x: this._node.getPositionX(),
                y: this._node.getPositionY(),
            }
        }
    },

    get rotation() {
        return {
            path: "rotation",
            type: "Number",
            name: "Rotation",
            attrs: {
                min: 0,
                max: 360,
            },
            value: this._node.getRotation()
        }
    },

    get scale() {
        return {
            path: "scale",
            type: "vec2",
            name: "Scale",
            attrs: {
                min: 0,
                max: 360,
            },
            value: {
                x: this._node.getScaleX(),
                y: this._node.getScaleY(),
            }
        }
    },

    get anchor() {
        return {
            path: "anchor",
            type: "vec2",
            name: "Anchor",
            attrs: {
                min: 0,
                max: 360,
            },
            value: {
                x: this._node.anchorX,
                y: this._node.anchorY,
            }
        }
    },

    get size() {
        let parent = this._node.getParent();
        let heightPer = 100;
        let widthPer = 100;
        if(parent && parent.width) {
            widthPer = this._node.width / parent.width * 100;
        }
        if(parent && parent.height) {
            heightPer = this._node.height / parent.height * 100;
        }
        return {
            path: "size",
            type: "size",
            name: "Size",
            attrs: {
                hasParent : parent != null,
                min: 0,
                max: 360,
            },
            value: {
                isWidthPer: this._node.isWidthPer,
                width: this._node.width,
                widthPer: widthPer,
                isHeightPer: this._node.isHeightPer,
                height: this._node.height,
                heightPer: heightPer,
            }
        }
    },

    get tag() {
        return {
            path: "tag",
            type: "string",
            name: "Tag",
            attrs: {
                min: 0,
                max: 360,
            },
            value: this._node._name,
        }
    },

    get opacity() {
        return {
            path: "opacity",
            type: "Number",
            name: "Opacity",
            attrs: {
                min: 0,
                max: 255,
            },
            value: this._node.opacity
        }
    },

    get skew() {
        return {
            path: "skew",
            type: "vec2",
            name: "Skew",
            attrs: {
                min: 0,
                max: 360,
            },
            value: {
                x: this._node.skewX,
                y: this._node.skewY,
            }
        }
    },

    get color() {
        return {
            path: "color",
            type: "color",
            name: "Color",
            attrs: {
                min: 0,
                max: 360,
            },
            value: {
                r: this._node.color.r,
                g: this._node.color.g,
                b: this._node.color.b,
                a: this._node.color.a
            }
        }
    },

    get __comps__() {
        let node = [ new WidgetData(this._node) ];
        if(this._node._className == "Node") {
        } else if(this._node._className == "Sprite") {
            node.push(new SpriteData(this._node));
        } else if(this._node._className == "LabelTTF") {
            node.push(new LabelData(this._node));
        } else if(this._node._className == "Slider") {
            node.push(new SliderData(this._node));
        } else {
        }
        
        return node;
    },

    setAttrib(path, value) {
        if(path == "tag") {
            this._node._name = value;
        } else if(path == "position.x") {
            this._node.x = value;
            this._node.left = null;
            this._node.right = null;
        } else if(path == "position.y") {
            this._node.y = value;
            this._node.top = null;
            this._node.bottom = null;
        } else if(path == "rotation") {
            this._node.rotation = value;
        } else if(path == "scale.x") {
            this._node.scaleX = value;
        } else if(path == "scale.y") {
            this._node.scaleY = value;
        } else if(path == "anchor.x") {
            this._node.anchorX = value;
        } else if(path == "anchor.y") {
            this._node.anchorY = value;
        } else if(path == "skew.x") {
            this._node.skewX = value;
        } else if(path == "skew.y") {
            this._node.skewY = value;
        } else if(path == "size.width") {
            this._node.width = value;
        } else if(path == "size.height") {
            this._node.height = value;
        } else if(path == "opacity") {
            this._node.opacity = value;
        } else if(path == "color") {
            this._node.color = new cc.Color(value.r, value.g, value.b, value.a);
        } else if(path == "size.isWidthPer") {
            this._node.isWidthPer = !this._node.isWidthPer;
        } else if(path == "size.isHeightPer") {
            this._node.isHeightPer = !this._node.isHeightPer;
        } else if(path == "size.widthPer") {
            let parent = this._node.getParent();
            if(parent && parent.width) {
                let val = value * parent.width / 100;
                this._node.width = parseFloat(val.toFixed(0));
            }
        } else if(path == "size.heightPer") {
            let parent = this._node.getParent();
            if(parent && parent.height) {
                let val = value * parent.height / 100;
                this._node.height = parseFloat(val.toFixed(0));
            }
        } else if(path == "relativePosition.checkTop") {
            if(!value) {
                this._node.top = null;
            }
        } else if(path == "relativePosition.checkLeft") {
            if(!value) {
                this._node.left = null;
            }
        } else if(path == "relativePosition.checkRight") {
            if(!value) {
                this._node.right = null;
            }
        } else if(path == "relativePosition.checkBottom") {
            if(!value) {
                this._node.bottom = null;
            }
        }
         else if(path == "relativePosition.top") {
            value = parseFloat(value);
            let parent = this._node.getParent();
            if(parent && parent.height) {
                this._node.y = parent.height - value;
                this._node.top = value;
            }
        } else if(path == "relativePosition.bottom") {
            value = parseFloat(value);
            this._node.y = value;
            this._node.bottom = value;
        } else if(path == "relativePosition.left") {
            value = parseFloat(value);
            this._node.x = value;
            this._node.left = value;
        } else if(path == "relativePosition.right") {
            value = parseFloat(value);
            let parent = this._node.getParent();
            if(parent && parent.width) {
                this._node.x = parent.width - value;
                this._node.right = value;
            }
        } else if(this._node._className == "LabelTTF") {
            if(path == "string") {
                this._node.string = value;
            } else if(path == "textAlign") {
                this._node.textAlign = parseFloat(value);
            } else if(path == "verticalAlign") {
                this._node.verticalAlign = parseFloat(value);
            } else if(path == "fontSize") {
                this._node.fontSize = value;
            } else if(path == "font") {
                this._node.font = font;
            } else if(path == "fillStyle") {
                this._node.fillStyle = new cc.Color(value.r, value.g, value.b, value.a);
            } else if(path == "strokeStyle") {
                this._node.strokeStyle = new cc.Color(value.r, value.g, value.b, value.a);
            } else if(path == "lineWidth") {
                this._node.lineWidth = value;
            } else if(path == "shadowOffsetX") {
                this._node.shadowOffsetX = value;
            } else if(path == "shadowOffsetY") {
                this._node.shadowOffsetY = value;
            } else if(path == "shadowOpacity") {
                this._node.shadowOpacity = value;
            } else if(path == "shadowBlur") {
                this._node.shadowBlur = value;
            } else {
                return;
            }
        } else if(this._node._className == "Sprite") {
            if(path == "srcBlendFactor") {
                this._node.setBlendFunc(parseInt(value), this._node.getBlendFunc().dst);
            } else if(path == "dstBlendFactor") {
                this._node.setBlendFunc(this._node.getBlendFunc().src, parseInt(value));
            }
        } else if(this._node._className == "Scale9") {
            if(path == "srcBlendFactor") {
                this._node.setBlendFunc(parseInt(value), this._node.getBlendFunc().dst);
            } else if(path == "dstBlendFactor") {
                this._node.setBlendFunc(this._node.getBlendFunc().src, parseInt(value));
            }
        } else {
            return;
        }

        
        Editor.Ipc.sendToAll("ui:has_item_change", {});
    },
}

BlendData = {
    0     : "ZERO",
    1     : "ONE",
    770   : "SRC_ALPHA",
    776   : "SRC_ALPHA_SATURATE",
    768   : "SRC_COLOR",
    772   : "DST_ALPHA",
    774   : "DST_COLOR",
    771   : "ONE_MINUS_SRC_ALPHA",
    769   : "ONE_MINUS_SRC_COLOR",
    773   : "ONE_MINUS_DST_ALPHA",
    775   : "ONE_MINUS_DST_COLOR",
    32770 : "ONE_MINUS_CONSTANT_ALPHA",
    32772 : "ONE_MINUS_CONSTANT_ALPHA",
}

SpriteData.prototype = {
    __editor__ : {
        "inspector": "cc.Sprite",
    },
    __displayName__: "Sprite",

    __type__: "cc.Sprite",

    get srcBlendFactor() {
        let factor = this._node.getBlendFunc().src;
        return {
            path: "srcBlendFactor",
            type: "select",
            name: "SrcBlendFactor",
            attrs: {
                selects: BlendData,
            },
            value: this._node.getBlendFunc().src,
        };
    },

    get dstBlendFactor() {
        let factor = this._node.getBlendFunc().dst;
        return {
            path: "dstBlendFactor",
            type: "select",
            name: "DstBlendFactor",
            attrs: {
                selects: BlendData,
            },
            value: this._node.getBlendFunc().dst,
        };
    },

    get trim() {
        return {
            path: "trim",
            type: "check",
            name: "Trim",
            attrs: {
                min: 0,
                max: 360,
            },
            value: this._node.trim,
        };
    }

}


WidgetData.prototype = {
    __editor__ : {
        "inspector": "cc.Widget",
    },
    __displayName__: "Widget",
    __type__: "cc.Widget",

    get isRelativePos() {
        return {
            path: "isRelativePos",
            type: "check",
            name: "RelativePos",
            attrs: {
            },
            value: this._node.isRelativePos || false,
        };
    },


    get folded() {
        return !(this._node.left || this._node.top || this._node.right || this._node.bottom);
    },

    get relativePosition() {
        return {
            path: "relativePosition",
            type: "vec2",
            name: "relativePosition",
            attrs: {
                min: 1,
                max: 100,
            },
            value: {
                isAlignLeft: "number" == typeof this._node.left,
                isAlignTop: "number" == typeof this._node.top,
                isAlignRight: "number" == typeof this._node.right,
                isAlignBottom: "number" == typeof this._node.bottom,
                left:this._node.left || 0,
                top:this._node.top || 0,
                right:this._node.right || 0,
                bottom:this._node.bottom || 0,
            }
        }
    },
}


LabelData.prototype = {
    __editor__ : {
        "inspector": "cc.Label",
    },
    __displayName__: "Label",
    __type__: "cc.Label",

    get string() {
        return {
            path: "string",
            type: "text",
            name: "String",
            attrs: {
            },
            value: this._node.string,
        };
    },

    get horizontalAlign() {
        return {
            path: "textAlign",
            type: "select",
            name: "HorAlign",
            attrs: {
                selects: {
                    0: "LEFT",
                    1: "CENTER",
                    2: "RIGHT",
                }
            },
            value: this._node.textAlign,
        };
    },

    get verticalAlign() {
        return {
            path: "verticalAlign",
            type: "select",
            name: "VerAlign",
            attrs: {
                selects: {
                    0: "TOP",
                    1: "CENTER",
                    2: "BOTTOM",
                }
            },
            value: this._node.verticalAlign,
        };
    },

    get fillStyle() {
        return {
            path: "fillStyle",
            type: "color",
            name: "FillStyle",
            attrs: {
            },
            value: {
                r: this._node.fillStyle.r,
                g: this._node.fillStyle.g,
                b: this._node.fillStyle.b,
                a: this._node.fillStyle.a
            }
        };
    },

    get strokeStyle() {
        return {
            path: "strokeStyle",
            type: "color",
            name: "StrokeStyle",
            attrs: {
            },
            value: {
                r: this._node.strokeStyle.r,
                g: this._node.strokeStyle.g,
                b: this._node.strokeStyle.b,
                a: this._node.strokeStyle.a
            }
        };
    },

    get lineWidth() {
        return {
            path: "lineWidth",
            type: "number",
            name: "LineWidth",
            attrs: {
            },
            value: this._node.lineWidth,
        };
    },

    get shadowOffsetX() {
        return {
            path: "shadowOffsetX",
            type: "number",
            name: "ShadowOffsetX",
            attrs: {
            },
            value: this._node.shadowOffsetX,
        };
    },

    get shadowOffsetY() {
        return {
            path: "shadowOffsetY",
            type: "number",
            name: "shadowOffsetY",
            attrs: {
            },
            value: this._node.shadowOffsetY,
        };
    },

    get shadowOpacity() {
        return {
            path: "shadowOpacity",
            type: "number",
            name: "shadowOpacity",
            attrs: {
            },
            value: this._node.shadowOpacity,
        };
    },

    get shadowBlur() {
        return {
            path: "shadowBlur",
            type: "number",
            name: "shadowBlur",
            attrs: {
            },
            value: this._node.shadowBlur,
        };
    },
}

SliderData.prototype = {
    __editor__ : {
        "inspector1": "cc.Slider",
    },
    __displayName__: "Slider",
    __type__: "cc.Slider",

    get totalLength() {
        return {
            path: "totalLength",
            type: "number",
            name: "TotalLength",
            attrs: {
            },
            value: this._node.totalLength,
        };
    },

    get progress() {
        return {
            path: "progress",
            type: "slider",
            name: "progress",
            attrs: {
            },
            value: this._node.progress,
        };
    },

    get __props__() {
        return [
            this.totalLength,
            this.progress,
        ];
    }
}