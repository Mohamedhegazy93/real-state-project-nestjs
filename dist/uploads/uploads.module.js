"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModule = void 0;
const common_1 = require("@nestjs/common");
const uploads_controller_1 = require("./uploads.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        controllers: [uploads_controller_1.UploadsController],
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './images',
                    filename: (req, file, cb) => {
                        const prefix = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
                        const filename = `${prefix}-${file.originalname}`;
                        cb(null, filename);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
                        cb(null, true);
                    }
                    else {
                        cb(new common_1.BadRequestException('unsupported file format'), false);
                    }
                },
                limits: {
                    fileSize: 200 * 1024 * 1024
                }
            })
        ]
    })
], UploadsModule);
//# sourceMappingURL=uploads.module.js.map