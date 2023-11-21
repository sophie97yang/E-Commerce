from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Member

member_routes = Blueprint('members', __name__)


@member_routes.route('/')
@login_required
def members():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    members = Member.query.all()
    return {'members': [member.to_dict_descriptive() for member in members]}


@member_routes.route('/<int:id>')
@login_required
def member(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    member = Member.query.get(id)
    return member.to_dict_descriptive()
