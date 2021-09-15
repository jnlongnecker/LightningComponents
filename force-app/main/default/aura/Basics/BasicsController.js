/*
    Here we have our controller, which is a unique JS file unlike one we've seen so far. This is because this
    is actually an object literal. So, like in all other JS objects, we need to define a key and then a value, the
    values being our functions; all separated by commas (,). Be VERY careful to not name any controller methods as the
    same name as Apex controller methods, as this will cause issues that are very hard to debug.
*/

({
    // Our key here is controllerAction (aka the name of our function)
    // Each function takes 3 parameters in order: component, event, helper
    Initialize: function (component, event, helper) {

        // We can use component.get() to retrieve attributes. Note we use the v. value provider passed as a string
        let size = component.get("v.numChildren");
        let allGuitarists = [
            { 'name': 'David Gilmour', 'image': '/DavidGilmour.jpg', 'description': 'David Jon Gilmour CBE (/ˈɡɪlmɔːr/ GHIL-mor; born 6 March 1946) is an English songwriter, guitarist, and singer who was a member of rock band Pink Floyd. He joined as guitarist and co-lead vocalist in 1968 shortly before the departure of founder member Syd Barrett.[1] Pink Floyd achieved international success with the concept albums The Dark Side of the Moon (1973), Wish You Were Here (1975), Animals (1977), and The Wall (1979).' },
            { 'name': 'John Petrucci', 'image': '/JohnPetrucci.jpg', 'description': 'John Peter Petrucci (born July 12, 1967) is an American guitarist, composer and producer. He is best known as a founding member of the progressive metal band Dream Theater. He produced or co-produced (often with former member Mike Portnoy before he departed the band in 2010) all of Dream Theater\'s albums from Metropolis Pt. 2: Scenes from a Memory (1999) to Distance Over Time (2019), and has been the sole producer of the band\'s albums released since A Dramatic Turn of Events (2011).' },
            { 'name': 'Mark Morton', 'image': '/MarkMorton.jpg', 'description': 'Mark Duane Morton (born November 25, 1972) is an American musician who is the lead guitarist and one of the founding members of the heavy metal American band Lamb of God. Morton frequently utilizes pentatonic scales and harmonic minor scales, and it has been noted that he has a blues style to his music. He composes and plays almost all of Lamb of God\'s guitar solos and forms many of the heavy groove rhythms' },
            { 'name': 'Mikael Åkerfeldt', 'image': '/MikaelAkerfeldt.jpg', 'description': 'Lars Mikael Åkerfeldt (Swedish: [ˈmîːkaɛl ˈôːkɛrˌfɛlt];[1] born 17 April 1974)[2] is a Swedish musician. He is the lead vocalist, guitarist, and primary songwriter of progressive metal band Opeth, and the former vocalist of death metal supergroup Bloodbath. He was also guitarist for the "one-off" band Steel, and is part of the collaboration Storm Corrosion with Steven Wilson.' },
            { 'name': 'Tom Morello', 'image': '/TomMorello.jpg', 'description': 'Thomas Baptist Morello (born May 30, 1964) is an American musician, singer, rapper, songwriter, actor, and political activist. He is best known for his tenure with the rock band Rage Against the Machine and then with Audioslave. Between 2016 and 2019, Morello was a member of the supergroup Prophets of Rage. Morello was also a touring musician with Bruce Springsteen and the E Street Band.' },
            { 'name': 'Tosin Abasi', 'image': '/TosinAbasi.png', 'description': 'Oluwatosin Ayoyinka Olumide "Tosin" Abasi (born January 7, 1983), is an American musician, best known as the founder and lead guitarist of the instrumental progressive metal band Animals as Leaders. He has recorded and released four albums with Animals as Leaders: a self-titled debut, Weightless, The Joy of Motion and their most recent album, The Madness of Many. A guitar virtuoso, Guitar World ranks Abasi at #97 on their list of 100 Greatest Guitarists of all time.' },
            { 'name': 'Yvette Young', 'image': '/YvetteYoung.jpg', 'description': 'Yvette Young (born June 28, 1991) is an American musician from San Jose, California. She is currently the front-woman for the math rock band Covet. Young used her background in piano to use polyphony on a guitar. She taught herself guitar, playing by ear she notes, "I write with my ear, so I’m not really in a box in terms of chord shapes. And I don’t use [traditional] shapes at all, which freaks a lot of people out! I have a million different tunings I work in too so I didn’t really put in the time to learn every shape in every tuning, that would be ridiculous."' }
        ];
        let numGuitarists = allGuitarists.length;
        let workingGuitarists = [...allGuitarists];
        let displayGuitarists = [];

        // Select 2 random guitarists and push them to the list
        for (let index = 0; index < size; index++) {

            // If we have more children than we have guitarists, allow some duplicates
            if (numGuitarists === 0) {
                workingGuitarists = [...allGuitarists];
                numGuitarists = allGuitarists.length;
            }

            // Make a selection, add it to the display list, and remove it from the working list
            let selection = Math.floor(Math.random() * numGuitarists);
            displayGuitarists.push(workingGuitarists[selection]);
            workingGuitarists.splice(selection, 1);
            numGuitarists--;
        }

        // We use component.set() to set an attribute to a value. Note again the v. value provider
        component.set("v.allGuitarists", allGuitarists);
        component.set("v.displayGuitarists", displayGuitarists);
    },

    // The above isn't really best practice. We should instead consolidate our logic in our helper
    Shuffle: function (component, event, helper) {
        helper.ShuffleGuitarists(component);
    }
})
