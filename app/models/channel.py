from .db import db, environment, SCHEMA, add_prefix_for_prod



class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id
        }

    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship('LiveChatMessage', back_populates='channel', cascade="all, delete")
