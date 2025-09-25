import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { getTimestamp } from "../utils";
import { Gender } from "../types/profile";


const timestampTransformer = {
    to: (value: string | null ) => value,
    from: (value: string | null | Date) => {

        if (value instanceof Date) {
            return getTimestamp(value);
        }

        return value;
    }
}

@Entity("profiles")
export class Profile {

    @PrimaryGeneratedColumn("uuid")
    id: UUID

    @Column( { length: 36 } )
    user_id: UUID

    @Column({ length: 255 })
    firstname: string

    @Column({ length: 255 })
    lastname: string

    @Column({ type: "enum", enum: Gender })
    gender: Gender

    @Column({ length: 20, nullable: true })
    phone: string

    @Column({ length: 20, nullable: true })
    whatsapp: string

    @Column({ length: 500, nullable: true })
    profile_picture: string

    @Column({ type: "timestamp", transformer: timestampTransformer})
    created_at: Date;

    @Column({ type: "timestamp", nullable: true, transformer: timestampTransformer})
    updated_at: Date;
}
