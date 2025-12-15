import { Document, Types } from "mongoose";
export type GuidedMeditationDocument = GuidedMeditation & Document;
export declare class GuidedMeditation {
    title: string;
    description: string;
    duration: number;
    category: string;
    audioUrl: string;
    imageUrl: string;
    plays: number;
    isPremium: boolean;
    order: number;
    active: boolean;
    createdBy?: Types.ObjectId;
}
export declare const GuidedMeditationSchema: import("mongoose").Schema<GuidedMeditation, import("mongoose").Model<GuidedMeditation, any, any, any, Document<unknown, any, GuidedMeditation, any, import("mongoose").DefaultSchemaOptions> & GuidedMeditation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, GuidedMeditation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    audioUrl?: import("mongoose").SchemaDefinitionProperty<string, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    plays?: import("mongoose").SchemaDefinitionProperty<number, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPremium?: import("mongoose").SchemaDefinitionProperty<boolean, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    order?: import("mongoose").SchemaDefinitionProperty<number, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    active?: import("mongoose").SchemaDefinitionProperty<boolean, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, GuidedMeditation, Document<unknown, {}, GuidedMeditation, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GuidedMeditation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, GuidedMeditation>;
