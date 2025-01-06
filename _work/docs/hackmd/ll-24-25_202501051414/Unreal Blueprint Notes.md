---
title: Unreal Blueprint Notes
tags: [chris]

---

# Unreal Blueprint Notes

## Lesson 2
- Blueprint editor
    - Main Graphs: Event Graph, Construction Script
    - Toolbar: Compile, Save, Browse, Find
    - Components Window 
    - Detials Panel
    - "My Blueprint Panel"

- Class Composition and Actor Components
- Custom Actor Class (Point Light)
- Class Definition (Point Light) vs Class Instance (dragged onto map)

## Lesson 3
- Common Variables
    - Boolean: Represents a True or False value
        -Common example: Is the player HP <=0?

    -    Interger: A non-fracional (whol number). Positive or negative
        -   Example: Number of coins collected by player

    - Float: High-precision fractional values (rational numbers)
        -Example: percentages/probabilities. Decimal places
    - String/Text/Name: A sequence of characters used to store words or "plain text"
        -Example: Text displayed as part of a HUD
    - Vector 3: Group of 3 FLoat values that represent 3 related values.
        -Example: Location (XYZ Coordinates), RGB Color (X=red, Y=green, Z=blue)
    - Rotator: Group of 3 Float Values that represnts a rotation fo 3d space
        -Example: Rotation X=roll, Y=Pitch, Z=Yaw
    - Transform: Contains the Location, Rotation, and Scale of an Object in 3d space
        -Example: The Transform of an Actor 
        
- You can Assign default values to variables after compiling

## Lesson 4: Using the Event Graph
- "Event Begin Play" Node
    - Executes code once when the game begins

- "Event Tick" Node
    - Executes code once every frame

- "Getters"and "Setters"
    - For Interger Variable (HP) with a value of 600, the node can either:
        - "Get HP" (Returns the value of HP (600))
        - "Set HP" (Allows us to set value of HP)
    - "Get HP" Node into "Print String" Node AUtomatically converts Interger into String
    - "Get HP" -> Subtract (1) -> "Set HP" -> Print String
        - Every frame subtract 1 from HP, Set it as new HP, and print

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074TRLJKED/hp_value_blueprint.png?pub_secret=7cf330a47f)

## Lesson 5: Construction Script
- Constuction Script
    - Customize the Class
    - Use component reference (point light) and set its properties with code
    - Runs everytime code is compiled
- Public Variables
    - Can be used to cuztomize properties per instance
    - Properties can be "exposed" to be editable in the sidebar of each isntance instead of just in the Blueprint window

- Set light color and intensity
    - Both "new" were "promoted to variables" and made public and instance editable
    ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0748LE7Q86/construction_scripts.png?pub_secret=db505a2162)

## Lesson 6: Arrays
- "A list of variables of the same type that contain the same name"
    - Searchable (get value)
    - Get random value from List
    - ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074FDA827M/array.png?pub_secret=e398bb6b0c)
    
- Node Alterations to Array in blueprint
    - Add
        - "Add" Node adds new string to index at the end of Array
        - "Add Unique" adds new string IF it doesn't already exist
        
        ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074U4ZD2JV/add_fireside_room.png?pub_secret=d8741f963a)

    - Insert
        - Inserts new string into an index of your choice in your array (Insert at Index 1 bumps everything 1 and higher up a number)

    - Remove
        - Remove index: Removes the index you select and everything bumps down to fill
        - Remove Item: Remove specific string "Classroom etc." and everything bumps down to fill.
            - Boolean pin to return TRUE if removed

    - Clear
        - Clear array of all items

    - Contains
        - Search array. Boolean returns True or False
    - Find
        - Search String and returns index of array
    - Length
        - Returns the number of items in array
    - Last Index
        - Returns highest Index (index 2 is 3rd added)
    - "Is Added"/"Is Valid"
        - Returns boolean

    - Random/Shuffle
        - Random keeps order but selects random item
        - Shuffle randomizes order of index
        -
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074U7CE8TT/all_array_nodes.png?pub_secret=3edd6385cb)

## Lesson 7: Code Execution Flow
- Sequence: Execute A then B
    - First shuffle index, then print 0

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07411T18KH/sequence_shuffle.png?pub_secret=caa8d90185)
- Flip Flop
    - Execudes path A and B alternating. When first called, executes A, then next time executes B. Path A prints 1, Path B prints 0
    - Good for lightswitches, etc. Every other time an effect happens (flipped on then off).

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074U9FCQG1/flipflop.png?pub_secret=38ab1522a7)

- Do-Once 
    - Ensures that code only runs once
    - Here, it limits "event tick" to only occuring once instead of every frame

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074J4CDG76/do_once.png?pub_secret=d199cf9407)
- Do N
    - Cap the number of times an action can happen
    - Here, it is allowd 3 times

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074FH1KAF5/do_n.png?pub_secret=969f759961)

- Branch Node
    - If statements. Uses Boolean condition to determine if True or False
    - Here, Does the Array contain "Main Studio" If True, print Item Found. If False, print Item Not Found

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074J5GUMCL/branch.png?pub_secret=6e2fe80683)
- For Each Loop
    - Executes the Loop Body for every Array (returning string and interger), then execute Completed.
    - Print Each element of the Array, then print "Completed"

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07493APURL/for_each.png?pub_secret=60cff3d16b)
- For Loop
    - Execute for each index in the range, then execute completed
    - This examples does exactly the same as the last. 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07416434NB/for_loop.png?pub_secret=34b6e3f7cd)

- While Loop
    - Will execute loop body as long as condition is True. When false, executes "Completed"
        - Watch out for infinite loop!

    - This example prints the Loop Body (an array string) and then increases the counter. Each time it executes, it is comparing it against the Length (3) of the array. (is 0<3? True). When it returns false (is 3<3), it executes the Completed.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07417HTCG7/while_loop.png?pub_secret=0cf5e99e04)
- Switch (on String)
    - Execute different paths based on String
    - This example selects a random Index from our array, and executes a print based on the one selected
    - It would execute "Default" if none of the strings were found

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074FR84K4J/switch_on_string.png?pub_secret=02272711f7)

## Lesson 8: User Defned Data Types
- The Enumerator
    - "A user defined list of options"
    - Appear as a drop down list in the editor
    - In Content Drawer Add->Blueprint->Enumerator
    - Here the enumerator  is used to switch and is visible in the details. When set to "Random Color" it executes a random array from the Color List

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0749BP6N9L/color_enumeration.png?pub_secret=ffc1c771c7)
- The Structure
    - "A way of grouping related variables in one place. Those variables are called member variables"
    - A strcutre can contain different data types (a boolean, a float, an enumerator, etc.) All inside one strucutre
    - Content Drawer Add -> Blueprint -> Structure

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074JHL2AVA/strucutre_window.png?pub_secret=34062fe613)

## Lesson 9: Functions and Events
- Functions (being names with fn)
    - A function is a block of code that is given a name and only runs when it is specifically called. 
        - Functions can take input parameters and output information (output paramenters) eg. float input, boolean output.
        - Can also have local variables that only exist within the function.
    - Execute all code in the same frame they are called in
    - Can take inputs and outputs
    - Cannot have delays
    - *This function has a local variable (String Selection). It uses a seqence to print a random value switching on string.*

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0749GWAG9L/function_in_event.png?pub_secret=46b33b269a)


![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074JL3TVS8/function.png?pub_secret=9941ad667f)

- Custom Events (begin names with ev)
    - Do not guaranee all code can be run in the same frame
    - Can only take inputs
    - Cannot have local variables
    - Can have delays and can be called from Editor
    - Beginning event calls a custom event (evGetRandomValue) which then calls our functoion (fnGetRandomValue)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F075516FMUY/event_to_call.png?pub_secret=3520cdebe2)

## Lesson 10: Time-based Code
- Delay
    - Delay Node
        - Delay by given value
        - Connectable to a "Random Float in Range to randomize delay"

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074EPDLFRU/delay_random.png?pub_secret=f1bed390e4)
    - Delay Until next Tick
    - Retriggerable Delay
        - If a delay is triggered while it is already delayed, it is ignored until the first is complete. Retriggerable will reset the delay everytime it is triggered.
- Timers
    - Set timer by Event
        - Input for event
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074JFB23N1/set_timer_by_event.png?pub_secret=4483176d93)

    - Set timer by Function Name
        - Input name of function or custom event as a string

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074M98MP99/set_timer_by_function.png?pub_secret=46c728e477)

- Handles
    - Handles can be made by promoting "return value" to a variable
        - Used with custom events to pause, unpause, and clear timer. Check "call in editor"

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074JGK6H0V/handle.png?pub_secret=d962131144)
## Lesson 11: Smooth Movement
- *Interpolation*: A method of constructing new data points based on the range of a discrete set of known points. Take a starting and ending value and estimate inbetween to smooth transition
- VInterp To (Vector Interpolation To)
    - Usually used with Tick or a Timer because it needs to be constantly called to get the updated values (Relative Location)
    - Also Vinterp to Constant. No easing, but consistent speed

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07476GCCCX/vinterp_to.png?pub_secret=7e78b08e0c)

- "Lerp" (Linear Interpolation)
    - for Color, FLoat, Rotator, Transform, or Vector
    - Uses "Alpha" to interpolate between A and B (100% of A when Alpha-0 and 100% of B when Alpha-1)
    - Needs fixed locations. Not relative! So here at Event BeginPlay, we execute Set Location
    - We also need to increase alpha from 0-1 to move the platform, so an Add node adds a value every tick. Make sure to Clamp so it does not go beyond 1!

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074MNV4S8J/lerp.png?pub_secret=dac9e86509)

- Back and Forth Movement
    - Boolean expressions for if True, do the Lerp from previous. If False, execute the same code with with Start and End reversed. Each code ends wth another boolean to determine how it informs the first

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074MKKB28K/backandforth.png?pub_secret=ff8f844428)

- Timelines
    - Open Seperate graph editor in blueprint where graphs can be manually created (Linear, FLoat, custom, etc. ) Much more control than other interpolation modes (in less space).
    - Uses one or more curve tracks and built in functionality to play forward and reverse
    - Abulity to adjust play rate

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074MKL08AX/timeline.png?pub_secret=7bbc188a4d)

## Leson 12: Collision and Overlaps
- Collision is part of the "Chaos" Physics system. Every blueprint is assigned an object type
    - Bench= static object
    - Elevator= dynamic object
    - Car = vehicle object
    - Character = pawn object
- The object also has a set of responses to all available object types in the engine
    - Ignore
    - Overlap
    - Block

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0750L4URSM/objectresponses.png?pub_secret=3aee7a3b8b)

- Event on Hit/Overlap
    - There are events that trigger on block/overlap that contain a lot of helpful information. Here, when hit, it executes a print string of the name of the object that hit + appended " hit us"


![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074K38H4BX/spherehitus.png?pub_secret=03e6da2ca9)

## Lesson 13: Direct Actor Communication
- Actor Communication: The ability for one actor instance to share information with one or more different instances in the level
    - Typically to get information from target actor or to trigger functionality
    - Direct Communciation
    - Casting
    - Interfaces
    - Event Dispatchers

- Direct Communication: The working actor uses a reference to the target actor to enable communication. Working actor can GET or SET the value of the target actor's variables. The Working actor can also execute functions on the target actor
- 