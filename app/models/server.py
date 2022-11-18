from .db import db, environment, SCHEMA, add_prefix_for_prod


members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('servers', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True),
)
if environment == "production":
    members.schema = SCHEMA


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    server_pic_url = db.Column(db.String(1000), nullable=True)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'server_pic_url': self.server_pic_url
        }

    owner = db.relationship("User", back_populates="servers_owned")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete")
    server_members = db.relationship("User",
        secondary=members,
        back_populates='servers_joined'
        )
