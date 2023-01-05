# User
* Id - num
* First name - text
* Username - text
* Password - text
* email - text
* created at - dateTime
* updated at - dateTime
* climb entry's - schema
* session entry's - schema
* ticklist - num
* us or french - enum

# Session entry
* Id - num
* Location - gps
* Climb Entry - Schema

# climb entry
* Id - num
* Indoor Outdoor - bool or enum
* climb discipline- enum
* climb style -  check list enum crimp, pinch, sloper, slab, overhang, vert, comp style, dynamic, static, powerful, technical, compression, heady etc
* Climb Name - text
* Grade - own table
* Number of attempts - number
* Send - boolean
* Climb description - text
* rating - number - 1 - 5

# ticklist entry
* Id - num
* climb entry
* Latitude - number -90 - 90
* Longitude - number -180 - 180

# climbStyle
* crimp
* pinch
* sloper,
* slab,
* overhang, 
* vert,
* Comp style,
* Dynamic,
* Static,
* Powerful,
* Endurance,
* Technical
* Compression,
* Heady,
* Face Climbing,
* Arete

# Grades
* V-scale
* YDS
* Font. scale
* French Scale