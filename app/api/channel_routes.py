from flask import Blueprint, request
from app.models import Channel, db
from app.forms import ChannelForm, EditChannelForm


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:server_id>")
def all_channels(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    print("CHANNELS backend", channels)
    print("channels", [channel.to_dict() for channel in channels])
    return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route("/<int:server_id>", methods=['POST'])
def create_channel(server_id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("FORM DATA", form.data)
    if form.validate_on_submit():
        channel = Channel(name=form.data['name'], server_id=form.data['server_id'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

@channel_routes.route("/<int:server_id>/<int:id>", methods=['PUT'])
def edit_channel(id):
    form = EditChannelForm()
    if form.validate_on_submit():
        channel = channel.query.get(id)
        data = request.json
        channel.name = data['name']
        db.session.commit()
        return channel.to_dict()

@channel_routes.route("/<int:server_id>/<int:id>", methods=['DELETE'])
def delete_channel(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()
