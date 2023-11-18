from ..models import db, SCHEMA, environment
from ..models.members import Member
from sqlalchemy.sql import text

def seed_members():

    print("seeding members NOWWWWWW")

    member1 = Member(
        first_name= "Sophie",
        last_name= "Yang",
        email= "sophie@gmail.com",
        password= "peteristhebest", #I think these need to be hashed somehow
        address= "123 Red Ave",
        city= "San Diego",
        state= "California",
        seller= True
        )

    member2 = Member(
        first_name= "Peang",
        last_name= "Ngo",
        email= "peang@gmail.com",
        password= "peteristhebest",
        address= "501 Blue Ave",
        city= "San Antonio",
        state= "Texas",
        seller= True
        )

    member3 = Member(
        first_name= "Yoseph",
        last_name= "Latif",
        email= "yoseph@gmail.com",
        password= "peteristhebest",
        address= "967 Purple St",
        city= "Los Angeles",
        state= "California",
        seller= True
        )

    member4 = Member(
        first_name= "Peter",
        last_name= "Dinh",
        email= "peter@gmail.com",
        password= "peteristhebest",
        address= "267 Royal Ave",
        city= "Hoboken",
        state= "New Jersey",
        seller= True
        )

    member5 = Member(
        first_name= "Brad",
        last_name= "Simpson",
        email= "brad@gmail.com",
        password= "password1",
        address= "564 Wyncote Ave",
        city= "Cherry Hill",
        state= "New Jersey",
        seller= False
        )

    member6 = Member(
        first_name= "David",
        last_name= "Nash",
        email= "david@gmail.com",
        password= "password2",
        address= "933 Spruce St",
        city= "Boston",
        state= "Massachusetts",
        seller= False
        )

    member7 = Member(
        first_name= "Andrew",
        last_name= "Tran",
        email= "andrew@gmail.com",
        password= "password3",
        address= "155 Lehigh St",
        city= "Chicago",
        state= "Illinois",
        seller= False
        )
    #demo seller
    member8 = Member(
        first_name= "Tom",
        last_name= "Cat",
        email= "ih8Jerry@gmail.com",
        password= "killhim",
        address= "123 Cheese Avenue",
        city= "San Francisco",
        state= "California",
        seller= True
    )

    #demo member
    member9 = Member(
        first_name= "Jerry",
        last_name= "Mouse",
        email= "givemecheese@gmail.com",
        password= "geniusmouse123",
        address= "123 Cheese Avenue",
        city= "San Francisco",
        state= "California",
        seller= False
    )

    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.add(member5)
    db.session.add(member6)
    db.session.add(member7)
    db.session.add(member8)
    db.session.add(member9)

    db.session.commit()

    print("Successful Member completed!!!!!")

    return [member1, member2, member3, member4, member5, member6, member7,member8,member9]

def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))

    db.session.commit()
