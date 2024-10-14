create table POSTS (
    id serial primary key,
    title varchar(255) not null,
    content text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
)

create table COMMENTS (
    id serial primary key,
    post_id integer,
    content text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    parent_id integer
)