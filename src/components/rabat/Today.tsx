import { useState, useEffect } from 'react';

const quotes = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Nelson Mandela"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Change will not come if we wait for some other person or some other time.",
    author: "Barack Obama"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "It is not titles that honor men, but men that honor titles.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The lion cannot protect himself from traps, and the fox cannot defend himself from wolves. One must therefore be a fox to recognize traps, and a lion to frighten wolves.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Never was anything great achieved without danger.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "We make a living by what we get, but we make a life by what we give.",
    author: "Winston Churchill"
  },
  {
    text: "Attitude is a little thing that makes a big difference.",
    author: "Winston Churchill"
  },
  {
    text: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    author: "Winston Churchill"
  },
  {
    text: "Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.",
    author: "Winston Churchill"
  },
  {
    text: "The only thing we have to fear is fear itself.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "If you can dream it, you can do it.",
    author: "Walt Disney"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "The best revenge is massive success.",
    author: "Frank Sinatra"
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison"
  },
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison"
  },
  {
    text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    author: "Thomas Edison"
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein"
  },
  {
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein"
  },
  {
    text: "The measure of intelligence is the ability to change.",
    author: "Albert Einstein"
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    text: "The weak can never forgive. Forgiveness is the attribute of the strong.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "An eye for an eye only ends up making the whole world blind.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Our greatest glory is not in never falling, but in rising every time we fall.",
    author: "Confucius"
  },
  {
    text: "The man who moves a mountain begins by carrying away small stones.",
    author: "Confucius"
  },
  {
    text: "Real knowledge is to know the extent of one's ignorance.",
    author: "Confucius"
  },
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates"
  },
  {
    text: "An unexamined life is not worth living.",
    author: "Socrates"
  },
  {
    text: "I cannot teach anybody anything. I can only make them think.",
    author: "Socrates"
  },
  {
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
    author: "Aristotle"
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle"
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle"
  },
  {
    text: "I came, I saw, I conquered.",
    author: "Julius Caesar"
  },
  {
    text: "Experience is the teacher of all things.",
    author: "Julius Caesar"
  },
  {
    text: "It is easier to find men who will volunteer to die, than to find those who are willing to endure pain with patience.",
    author: "Julius Caesar"
  },
  {
    text: "As a rule, men worry more about what they can't see than about what they can.",
    author: "Julius Caesar"
  },
  {
    text: "The die is cast.",
    author: "Julius Caesar"
  },
  {
    text: "It is not enough to have a good mind; the main thing is to use it well.",
    author: "René Descartes"
  },
  {
    text: "I think, therefore I am.",
    author: "René Descartes"
  },
  {
    text: "The greatest minds are capable of the greatest vices as well as of the greatest virtues.",
    author: "René Descartes"
  },
  {
    text: "If you would be a real seeker after truth, it is necessary that at least once in your life you doubt, as far as possible, all things.",
    author: "René Descartes"
  },
  {
    text: "The reading of all good books is like a conversation with the finest minds of past centuries.",
    author: "René Descartes"
  },
  {
    text: "Divide each difficulty into as many parts as is feasible and necessary to resolve it.",
    author: "René Descartes"
  },
  {
    text: "The only thing necessary for the triumph of evil is for good men to do nothing.",
    author: "Edmund Burke"
  },
  {
    text: "Nobody made a greater mistake than he who did nothing because he could do only a little.",
    author: "Edmund Burke"
  },
  {
    text: "Those who don't know history are destined to repeat it.",
    author: "Edmund Burke"
  },
  {
    text: "You can never plan the future by the past.",
    author: "Edmund Burke"
  },
  {
    text: "The greater the power, the more dangerous the abuse.",
    author: "Edmund Burke"
  },
  {
    text: "All that is necessary for evil to triumph is for good men to do nothing.",
    author: "Edmund Burke"
  },
  {
    text: "I have learned over the years that when one's mind is made up, this diminishes fear.",
    author: "Rosa Parks"
  },
  {
    text: "Each person must live their life as a model for others.",
    author: "Rosa Parks"
  },
  {
    text: "Stand for something or you will fall for anything. Today's mighty oak is yesterday's nut that held its ground.",
    author: "Rosa Parks"
  },
  {
    text: "I would like to be remembered as a person who wanted to be free... so other people would be also free.",
    author: "Rosa Parks"
  },
  {
    text: "Knowing what must be done does away with fear.",
    author: "Rosa Parks"
  },
  {
    text: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The time is always right to do what is right.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Injustice anywhere is a threat to justice everywhere.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Faith is taking the first step even when you don't see the whole staircase.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Our lives begin to end the day we become silent about things that matter.",
    author: "Martin Luther King Jr."
  },
  {
    text: "I have decided to stick with love. Hate is too great a burden to bear.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The ultimate measure of a man is not where he stands in moments of comfort, but where he stands at times of challenge and controversy.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Life's most persistent and urgent question is, 'What are you doing for others?'",
    author: "Martin Luther King Jr."
  },
  {
    text: "If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Intelligence plus character—that is the goal of true education.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The function of education is to teach one to think intensively and to think critically.",
    author: "Martin Luther King Jr."
  },
  {
    text: "We must accept finite disappointment, but never lose infinite hope.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Ask not what your country can do for you – ask what you can do for your country.",
    author: "John F. Kennedy"
  },
  {
    text: "Change is the law of life. And those who look only to the past or present are certain to miss the future.",
    author: "John F. Kennedy"
  },
  {
    text: "Efforts and courage are not enough without purpose and direction.",
    author: "John F. Kennedy"
  },
  {
    text: "Those who dare to fail miserably can achieve greatly.",
    author: "John F. Kennedy"
  },
  {
    text: "Conformity is the jailer of freedom and the enemy of growth.",
    author: "John F. Kennedy"
  },
  {
    text: "Leadership and learning are indispensable to each other.",
    author: "John F. Kennedy"
  },
  {
    text: "The rights of every man are diminished when the rights of one man are threatened.",
    author: "John F. Kennedy"
  },
  {
    text: "Let us never negotiate out of fear. But let us never fear to negotiate.",
    author: "John F. Kennedy"
  },
  {
    text: "As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them.",
    author: "John F. Kennedy"
  },
  {
    text: "The ignorance of one voter in a democracy impairs the security of all.",
    author: "John F. Kennedy"
  },
  {
    text: "We choose to go to the moon not because it is easy, but because it is hard.",
    author: "John F. Kennedy"
  },
  {
    text: "A house divided against itself cannot stand.",
    author: "Abraham Lincoln"
  },
  {
    text: "Whatever you are, be a good one.",
    author: "Abraham Lincoln"
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln"
  },
  {
    text: "Nearly all men can stand adversity, but if you want to test a man's character, give him power.",
    author: "Abraham Lincoln"
  },
  {
    text: "I am a slow walker, but I never walk back.",
    author: "Abraham Lincoln"
  },
  {
    text: "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
    author: "Abraham Lincoln"
  },
  {
    text: "Those who deny freedom to others deserve it not for themselves.",
    author: "Abraham Lincoln"
  },
  {
    text: "I do the very best I know how, the very best I can, and I mean to keep on doing so until the end.",
    author: "Abraham Lincoln"
  },
  {
    text: "The probability that we may fail in the struggle ought not to deter us from the support of a cause we believe to be just.",
    author: "Abraham Lincoln"
  },
  {
    text: "Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing.",
    author: "Abraham Lincoln"
  },
  {
    text: "I walk slowly, but I never walk backward.",
    author: "Abraham Lincoln"
  },
  {
    text: "You cannot escape the responsibility of tomorrow by evading it today.",
    author: "Abraham Lincoln"
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln"
  },
  {
    text: "The man who has no imagination has no wings.",
    author: "Muhammad Ali"
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali"
  },
  {
    text: "He who is not courageous enough to take risks will accomplish nothing in life.",
    author: "Muhammad Ali"
  },
  {
    text: "Service to others is the rent you pay for your room here on earth.",
    author: "Muhammad Ali"
  },
  {
    text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
    author: "Muhammad Ali"
  },
  {
    text: "Impossible is just a big word thrown around by small men.",
    author: "Muhammad Ali"
  },
  {
    text: "Float like a butterfly, sting like a bee.",
    author: "Muhammad Ali"
  },
  {
    text: "It isn't the mountains ahead to climb that wear you out; it's the pebble in your shoe.",
    author: "Muhammad Ali"
  },
  {
    text: "A man who views the world the same at 50 as he did at 20 has wasted 30 years of his life.",
    author: "Muhammad Ali"
  },
  {
    text: "The best way out is always through.",
    author: "Robert Frost"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  },
  {
    text: "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost"
  },
  {
    text: "Freedom lies in being bold.",
    author: "Robert Frost"
  },
  {
    text: "Education is the ability to listen to almost anything without losing your temper or your self-confidence.",
    author: "Robert Frost"
  },
  {
    text: "A diplomat is a man who always remembers a woman's birthday but never remembers her age.",
    author: "Robert Frost"
  },
  {
    text: "Half the world is composed of people who have something to say and can't, and the other half who have nothing to say and keep on saying it.",
    author: "Robert Frost"
  },
  {
    text: "The brain is wider than the sky.",
    author: "Robert Frost"
  },
  {
    text: "We dance round in a ring and suppose, but the Secret sits in the middle and knows.",
    author: "Robert Frost"
  },
  {
    text: "A jury consists of twelve persons chosen to decide who has the better lawyer.",
    author: "Robert Frost"
  },
  {
    text: "The only way to have a friend is to be one.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Write it on your heart that every day is the best day in the year.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "For every minute you are angry you lose sixty seconds of happiness.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Nothing great was ever achieved without enthusiasm.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The creation of a thousand forests is in one acorn.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Life is a journey, not a destination.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "What you do speaks so loudly that I cannot hear what you say.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Without ambition one starts nothing. Without work one finishes nothing.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The reward of a thing well done is having done it.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Adopt the pace of nature: her secret is patience.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Every artist was first an amateur.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "It is not the length of life, but the depth.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Courage is resistance to fear, mastery of fear—not absence of fear.",
    author: "Mark Twain"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    author: "Mark Twain"
  },
  {
    text: "Kindness is the language which the deaf can hear and the blind can see.",
    author: "Mark Twain"
  },
  {
    text: "The two most important days in your life are the day you are born and the day you find out why.",
    author: "Mark Twain"
  },
  {
    text: "Good friends, good books, and a sleepy conscience: this is the ideal life.",
    author: "Mark Twain"
  },
  {
    text: "Never put off till tomorrow what may be done day after tomorrow just as well.",
    author: "Mark Twain"
  },
  {
    text: "If you tell the truth, you don't have to remember anything.",
    author: "Mark Twain"
  },
  {
    text: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
    author: "Mark Twain"
  },
  {
    text: "A person who won't read has no advantage over one who can't read.",
    author: "Mark Twain"
  },
  {
    text: "I have never let my schooling interfere with my education.",
    author: "Mark Twain"
  },
  {
    text: "The man who does not read has no advantage over the man who cannot read.",
    author: "Mark Twain"
  },
  {
    text: "It's not the size of the dog in the fight, it's the size of the fight in the dog.",
    author: "Mark Twain"
  },
  {
    text: "Keep away from people who try to belittle your ambitions.",
    author: "Mark Twain"
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso"
  },
  {
    text: "Everything you can imagine is real.",
    author: "Pablo Picasso"
  },
  {
    text: "Learn the rules like a pro, so you can break them like an artist.",
    author: "Pablo Picasso"
  },
  {
    text: "Only put off until tomorrow what you are willing to die having left undone.",
    author: "Pablo Picasso"
  },
  {
    text: "Good artists copy, great artists steal.",
    author: "Pablo Picasso"
  },
  {
    text: "The meaning of life is to find your gift. The purpose of life is to give it away.",
    author: "Pablo Picasso"
  },
  {
    text: "Art is the lie that enables us to realize the truth.",
    author: "Pablo Picasso"
  },
  {
    text: "Every child is an artist. The problem is how to remain an artist once we grow up.",
    author: "Pablo Picasso"
  },
  {
    text: "It takes a long time to become young.",
    author: "Pablo Picasso"
  },
  {
    text: "Others have seen what is and asked why. I have seen what could be and asked why not.",
    author: "Pablo Picasso"
  },
  {
    text: "I am always doing that which I cannot do, in order that I may learn how to do it.",
    author: "Pablo Picasso"
  },
  {
    text: "Inspiration exists, but it has to find you working.",
    author: "Pablo Picasso"
  },
  {
    text: "The chief enemy of creativity is good sense.",
    author: "Pablo Picasso"
  },
  {
    text: "There are painters who transform the sun to a yellow spot, but there are others who transform a yellow spot into the sun.",
    author: "Pablo Picasso"
  },
  {
    text: "He can who thinks he can, and he can't who thinks he can't. This is an inexorable, indisputable law.",
    author: "Pablo Picasso"
  },
  {
    text: "The older you get, the stronger the wind gets—and it's always in your face.",
    author: "Pablo Picasso"
  },
  {
    text: "To know what you're going to draw, you have to begin drawing.",
    author: "Pablo Picasso"
  },
  {
    text: "I'd rather regret the things I've done than regret the things I haven't done.",
    author: "Lucille Ball"
  },
  {
    text: "Love yourself first and everything else falls into line.",
    author: "Lucille Ball"
  },
  {
    text: "One of the things I learned the hard way was that it doesn't pay to get discouraged.",
    author: "Lucille Ball"
  },
  {
    text: "In life, all good things come hard, but wisdom is the hardest to come by.",
    author: "Lucille Ball"
  },
  {
    text: "Luck? I don't know anything about luck. I've never banked on it and I'm afraid of people who do.",
    author: "Lucille Ball"
  },
  {
    text: "The secret of staying young is to live honestly, eat slowly, and lie about your age.",
    author: "Lucille Ball"
  },
  {
    text: "I have an everyday religion that works for me. Love yourself first, and everything else falls into line.",
    author: "Lucille Ball"
  },
  {
    text: "Knowing what you cannot do is more important than knowing what you can do.",
    author: "Lucille Ball"
  },
  {
    text: "You really have to love yourself to get anything done in this world.",
    author: "Lucille Ball"
  },
  {
    text: "It's a helluva start, being able to recognize what makes you happy.",
    author: "Lucille Ball"
  },
  {
    text: "I would rather die of passion than of boredom.",
    author: "Vincent van Gogh"
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh"
  },
  {
    text: "What would life be if we had no courage to attempt anything?",
    author: "Vincent van Gogh"
  },
  {
    text: "I am seeking, I am striving, I am in it with all my heart.",
    author: "Vincent van Gogh"
  },
  {
    text: "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.",
    author: "Vincent van Gogh"
  },
  {
    text: "I dream my painting and I paint my dream.",
    author: "Vincent van Gogh"
  },
  {
    text: "Normality is a paved road: It's comfortable to walk, but no flowers grow on it.",
    author: "Vincent van Gogh"
  },
  {
    text: "I feel that there is nothing more truly artistic than to love people.",
    author: "Vincent van Gogh"
  },
  {
    text: "The fishermen know that the sea is dangerous and the storm terrible, but they have never found these dangers sufficient reason for remaining ashore.",
    author: "Vincent van Gogh"
  },
  {
    text: "I put my heart and soul into my work, and I have lost my mind in the process.",
    author: "Vincent van Gogh"
  },
  {
    text: "There is no blue without yellow and without orange.",
    author: "Vincent van Gogh"
  },
  {
    text: "For my part I know nothing with any certainty, but the sight of the stars makes me dream.",
    author: "Vincent van Gogh"
  },
  {
    text: "It is good to love many things, for therein lies the true strength.",
    author: "Vincent van Gogh"
  },
  {
    text: "Do not quench your inspiration and your imagination; do not become the slave of your model.",
    author: "Vincent van Gogh"
  },
  {
    text: "As practice makes perfect, I cannot but make progress; each drawing one makes, each study one paints, is a step forward.",
    author: "Vincent van Gogh"
  },
  {
    text: "I am always doing what I cannot do yet, in order to learn how to do it.",
    author: "Vincent van Gogh"
  },
  {
    text: "There is nothing more truly artistic than to love people.",
    author: "Vincent van Gogh"
  },
  {
    text: "The beginning is the most important part of the work.",
    author: "Plato"
  },
  {
    text: "Wise men speak because they have something to say; fools because they have to say something.",
    author: "Plato"
  },
  {
    text: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
    author: "Plato"
  },
  {
    text: "The measure of a man is what he does with power.",
    author: "Plato"
  },
  {
    text: "Courage is knowing what not to fear.",
    author: "Plato"
  },
  {
    text: "Opinion is the medium between knowledge and ignorance.",
    author: "Plato"
  },
  {
    text: "Ignorance, the root and stem of every evil.",
    author: "Plato"
  },
  {
    text: "The price good men pay for indifference to public affairs is to be ruled by evil men.",
    author: "Plato"
  },
  {
    text: "One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.",
    author: "Plato"
  },
  {
    text: "Good people do not need laws to tell them to act responsibly, while bad people will find a way around the laws.",
    author: "Plato"
  },
  {
    text: "The throne is not a privilege, it is a responsibility.",
    author: "King Mohammed VI"
  },
  {
    text: "Development is not just about building infrastructure, it's about building human capacity.",
    author: "King Mohammed VI"
  },
  {
    text: "Morocco's strength lies in its diversity and its ability to embrace modernity while preserving its traditions.",
    author: "King Mohammed VI"
  },
  {
    text: "True democracy is not just about elections, it's about ensuring dignity and justice for all citizens.",
    author: "King Mohammed VI"
  },
  {
    text: "We must invest in our youth, for they are the architects of our future.",
    author: "King Mohammed VI"
  },
  {
    text: "Economic development without social justice is meaningless.",
    author: "King Mohammed VI"
  },
  {
    text: "Morocco's African identity is not a choice, it is a reality and a destiny.",
    author: "King Mohammed VI"
  },
  {
    text: "Solidarity is not charity, it is a duty we owe to one another.",
    author: "King Mohammed VI"
  },
  {
    text: "The fight against poverty is the most noble of all battles.",
    author: "King Mohammed VI"
  },
  {
    text: "Women's empowerment is not a favor, it is a right and a necessity for progress.",
    author: "King Mohammed VI"
  },
  {
    text: "A nation that does not honor its past cannot build its future.",
    author: "King Hassan II"
  },
  {
    text: "Authority without wisdom is tyranny, and wisdom without authority is futile.",
    author: "King Hassan II"
  },
  {
    text: "The art of governance is the art of balance.",
    author: "King Hassan II"
  },
  {
    text: "A leader must have the courage to make difficult decisions for the greater good.",
    author: "King Hassan II"
  },
  {
    text: "Morocco's stability is built on the pillars of tradition and progress.",
    author: "King Hassan II"
  },
  {
    text: "Diplomacy is the art of making the impossible possible.",
    author: "King Hassan II"
  },
  {
    text: "National unity is our greatest strength in the face of adversity.",
    author: "King Hassan II"
  },
  {
    text: "The Sahara is Moroccan, and Morocco is Saharan.",
    author: "King Hassan II"
  },
  {
    text: "A wise ruler listens to his people before he speaks.",
    author: "King Hassan II"
  },
  {
    text: "Independence is not given, it is earned through sacrifice and determination.",
    author: "King Mohammed V"
  },
  {
    text: "The unity of our people is the foundation of our sovereignty.",
    author: "King Mohammed V"
  },
  {
    text: "Freedom is the most precious gift a nation can possess.",
    author: "King Mohammed V"
  },
  {
    text: "A leader's duty is to serve his people, not to be served by them.",
    author: "King Mohammed V"
  },
  {
    text: "Justice and equality are the cornerstones of a free society.",
    author: "King Mohammed V"
  },
  {
    text: "Our struggle for independence is a struggle for dignity.",
    author: "King Mohammed V"
  },
  {
    text: "The strength of a nation lies in the character of its people.",
    author: "King Mohammed V"
  },
  {
    text: "We must build a Morocco where every citizen has a voice.",
    author: "King Mohammed V"
  },
  {
    text: "True leadership requires sacrifice and unwavering commitment.",
    author: "King Mohammed V"
  },
  {
    text: "Our diversity is our wealth, our unity is our strength.",
    author: "Allal al-Fassi"
  },
  {
    text: "Independence without social justice is incomplete.",
    author: "Allal al-Fassi"
  },
  {
    text: "Education is the key to liberation and progress.",
    author: "Allal al-Fassi"
  },
  {
    text: "A nation's identity is rooted in its history and culture.",
    author: "Allal al-Fassi"
  },
  {
    text: "The fight for freedom is a continuous struggle that requires vigilance.",
    author: "Allal al-Fassi"
  },
  {
    text: "Nationalism without humanism is hollow.",
    author: "Allal al-Fassi"
  },
  {
    text: "Reform must come from within, not be imposed from without.",
    author: "Mehdi Ben Barka"
  },
  {
    text: "True revolution is the liberation of human potential.",
    author: "Mehdi Ben Barka"
  },
  {
    text: "Economic independence is as important as political independence.",
    author: "Mehdi Ben Barka"
  },
  {
    text: "The people are the true architects of change.",
    author: "Mehdi Ben Barka"
  },
  {
    text: "Social justice is not a luxury, it is a fundamental right.",
    author: "Mehdi Ben Barka"
  },
  {
    text: "Development must serve the people, not exploit them.",
    author: "Mehdi Ben Barka"
  },
  {
    text: "Democracy is meaningless without economic equality.",
    author: "Abderrahim Bouabid"
  },
  {
    text: "Progress requires both vision and action.",
    author: "Abderrahim Bouabid"
  },
  {
    text: "A just society is one where opportunity is accessible to all.",
    author: "Abderrahim Bouabid"
  },
  {
    text: "The measure of a nation's greatness is how it treats its most vulnerable.",
    author: "Abderrahim Bouabid"
  },
  {
    text: "Political freedom must be accompanied by economic freedom.",
    author: "Abderrahim Bouabid"
  },
  {
    text: "Dialogue is the foundation of democracy.",
    author: "Abdellatif Filali"
  },
  {
    text: "Diplomacy is the art of building bridges, not walls.",
    author: "Abdellatif Filali"
  },
  {
    text: "Morocco's role in Africa is one of partnership, not domination.",
    author: "Abdellatif Filali"
  },
  {
    text: "Regional cooperation is essential for shared prosperity.",
    author: "Abdellatif Filali"
  },
  {
    text: "Morocco's future lies in the hands of its educated youth.",
    author: "Driss Jettou"
  },
  {
    text: "Good governance requires transparency and accountability.",
    author: "Driss Jettou"
  },
  {
    text: "Economic reform must benefit all segments of society.",
    author: "Driss Jettou"
  },
  {
    text: "Modernization does not mean abandoning our values.",
    author: "Driss Jettou"
  },
  {
    text: "A strong economy is built on a foundation of education and innovation.",
    author: "Driss Jettou"
  },
  {
    text: "The path to progress is paved with hard work and determination.",
    author: "Abbas El Fassi"
  },
  {
    text: "National development requires the participation of all citizens.",
    author: "Abbas El Fassi"
  },
  {
    text: "We must build institutions that serve the people, not the other way around.",
    author: "Abbas El Fassi"
  },
  {
    text: "Morocco's stability is a model for the region.",
    author: "Abbas El Fassi"
  },
  {
    text: "Reform is a continuous process, not a destination.",
    author: "Abdelilah Benkirane"
  },
  {
    text: "Justice and development go hand in hand.",
    author: "Abdelilah Benkirane"
  },
  {
    text: "The voice of the people must be heard and respected.",
    author: "Abdelilah Benkirane"
  },
  {
    text: "True leadership means serving with humility and integrity.",
    author: "Abdelilah Benkirane"
  },
  {
    text: "Economic growth must translate into improved living standards for all.",
    author: "Abdelilah Benkirane"
  },
  {
    text: "Morocco's territorial integrity is non-negotiable.",
    author: "Saadeddine El Othmani"
  },
  {
    text: "Sustainable development requires environmental responsibility.",
    author: "Saadeddine El Othmani"
  },
  {
    text: "Healthcare and education are fundamental rights, not privileges.",
    author: "Saadeddine El Othmani"
  },
  {
    text: "National unity transcends political differences.",
    author: "Saadeddine El Othmani"
  },
  {
    text: "The strength of our democracy lies in our institutions.",
    author: "Saadeddine El Othmani"
  },
  {
    text: "Morocco's strategic position demands wise and balanced diplomacy.",
    author: "Aziz Akhannouch"
  },
  {
    text: "Investment in agriculture is investment in our future.",
    author: "Aziz Akhannouch"
  },
  {
    text: "Economic resilience comes from diversification and innovation.",
    author: "Aziz Akhannouch"
  },
  {
    text: "We must create opportunities for all Moroccans to prosper.",
    author: "Aziz Akhannouch"
  },
  {
    text: "Partnership with the private sector is key to development.",
    author: "Aziz Akhannouch"
  },
  {
    text: "Morocco's cultural heritage is a bridge between civilizations.",
    author: "Mohamed Benaissa"
  },
  {
    text: "Diplomacy is about finding common ground while defending national interests.",
    author: "Mohamed Benaissa"
  },
  {
    text: "Our foreign policy reflects our values and aspirations.",
    author: "Mohamed Benaissa"
  },
  {
    text: "International cooperation is essential in an interconnected world.",
    author: "Mohamed Benaissa"
  },
  {
    text: "Peace and stability in the region benefit all nations.",
    author: "Mohamed Benaissa"
  },
  {
    text: "The Moroccan model of development is unique and effective.",
    author: "Salaheddine Mezouar"
  },
  {
    text: "Trade and investment are engines of prosperity.",
    author: "Salaheddine Mezouar"
  },
  {
    text: "Morocco's openness to the world is a source of strength.",
    author: "Salaheddine Mezouar"
  },
  {
    text: "Economic diplomacy serves our national interests.",
    author: "Salaheddine Mezouar"
  },
  {
    text: "We must position Morocco as a hub for Africa and Europe.",
    author: "Salaheddine Mezouar"
  },
  {
    text: "Human rights are universal and indivisible.",
    author: "Nasser Bourita"
  },
  {
    text: "Morocco's sovereignty over its territory is a matter of principle.",
    author: "Nasser Bourita"
  },
  {
    text: "Multilateralism is the foundation of international order.",
    author: "Nasser Bourita"
  },
  {
    text: "Our African partnerships are based on mutual respect and benefit.",
    author: "Nasser Bourita"
  },
  {
    text: "Diplomacy requires patience, wisdom, and strategic vision.",
    author: "Nasser Bourita"
  },
  {
    text: "Women's participation in politics strengthens democracy.",
    author: "Bassima Hakkaoui"
  },
  {
    text: "Social solidarity is the foundation of a cohesive society.",
    author: "Bassima Hakkaoui"
  },
  {
    text: "Family values are the cornerstone of our society.",
    author: "Bassima Hakkaoui"
  },
  {
    text: "Empowering women empowers the entire nation.",
    author: "Bassima Hakkaoui"
  },
  {
    text: "Social progress requires addressing inequality at its roots.",
    author: "Bassima Hakkaoui"
  },
  {
    text: "Morocco's religious tolerance is a model for the world.",
    author: "Ahmed Toufiq"
  },
  {
    text: "Spiritual values guide our path to progress.",
    author: "Ahmed Toufiq"
  },
  {
    text: "Moderation and balance are essential in all aspects of life.",
    author: "Ahmed Toufiq"
  },
  {
    text: "Faith and reason are complementary, not contradictory.",
    author: "Ahmed Toufiq"
  },
  {
    text: "Our Islamic heritage teaches us compassion and justice.",
    author: "Ahmed Toufiq"
  },
  {
    text: "Everyone sees what you appear to be, few experience what you really are.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Men judge generally more by the eye than by the hand, for everyone can see and few can feel.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The wise man does at once what the fool does finally.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Where the willingness is great, the difficulties cannot be great.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "There is no other way to guard yourself against flattery than by making men understand that telling you the truth will not offend you.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "He who wishes to be obeyed must know how to command.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Before all else, be armed.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The promise given was a necessity of the past: the word broken is a necessity of the present.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Men are so simple and so much inclined to obey immediate needs that a deceiver will never lack victims for his deceptions.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Politics have no relation to morals.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "One change always leaves the way open for the establishment of others.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Whoever conquers a free town and does not demolish it commits a great error and may expect to be ruined himself.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "A prince never lacks legitimate reasons to break his promise.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Men are driven by two principal impulses, either by love or by fear.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "It is better to be feared than loved, if you cannot be both.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The first method for estimating the intelligence of a ruler is to look at the men he has around him.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Whoever desires constant success must change his conduct with the times.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "A return to first principles in a republic is sometimes caused by simple virtues of one man.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The more sand has escaped from the hourglass of our life, the clearer we should see through it.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Hatred is gained as much by good works as by evil.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "There is nothing more difficult to take in hand, more perilous to conduct, or more uncertain in its success, than to take the lead in the introduction of a new order of things.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Entrepreneurs are simply those who understand that there is little difference between obstacle and opportunity and are able to turn both to their advantage.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Of mankind we may say in general they are fickle, hypocritical, and greedy of gain.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Princes and governments are far more dangerous than other elements within society.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "War should be the only study of a prince.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "A wise ruler ought never to keep faith when by doing so it would be against his interests.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The end justifies the means.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Men rise from one ambition to another: first, they seek to secure themselves against attack, and then they attack others.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Tardiness often robs us opportunity, and the dispatch of our forces.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Since love and fear can hardly exist together, if we must choose between them, it is far safer to be feared than loved.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "A son can bear with equanimity the loss of his father, but the loss of his inheritance may drive him to despair.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Whosoever desires constant success must change his conduct with the times.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "He who builds on the people, builds on mud.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Benefits should be conferred gradually; and in that way they will taste better.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Injuries ought to be done all at one time, so that, being tasted less, they offend less.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Men ought either to be well treated or crushed, because they can avenge themselves of lighter injuries, of more serious ones they cannot.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "There are three classes of intellects: one which comprehends by itself; another which appreciates what others comprehend; and a third which neither comprehends by itself nor by the showing of others.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "One who deceives will always find those who allow themselves to be deceived.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "For the great majority of mankind are satisfied with appearances, as though they were realities, and are often more influenced by the things that seem than by those that are.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "God is not willing to do everything, and thus take away our free will and that share of glory which belongs to us.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Whoever is responsible for another's becoming powerful ruins himself.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The vulgar crowd always is taken by appearances, and the world consists chiefly of the vulgar.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "A prudent man should always follow in the path trodden by great men and imitate those who are most excellent.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "To understand the nature of the people one must be a prince, and to understand the nature of the prince, one must be of the people.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Wise men say, and not without reason, that whoever wishes to foresee the future must consult the past.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The best fortress is to be found in the love of the people, for although you may have fortresses they will not save you if you are hated by the people.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Severities should be dealt out all at once, that their suddenness may give less offense; benefits ought to be handed out drop by drop, that they may be relished the more.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "For among other evils caused by being disarmed, it renders you contemptible.",
    author: "Niccolò Machiavelli"
  },
];

export default function Today() {
  // Get a truly random quote on mount using crypto for better randomness
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const [quote, setQuote] = useState(() => getRandomQuote());
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Set initial random quote
    setQuote(getRandomQuote());

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFadeIn(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Animated Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#A78BFA', stopOpacity: 0.3 }} />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#F472B6', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 0.2 }} />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#34D399', stopOpacity: 0.25 }} />
              <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 0.25 }} />
            </linearGradient>
          </defs>
          
          {/* Wave 1 */}
          <path
            fill="url(#wave1)"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>

          {/* Wave 2 */}
          <path
            fill="url(#wave2)"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,261.3C672,277,768,267,864,240C960,213,1056,171,1152,176C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>

          {/* Wave 3 */}
          <path
            fill="url(#wave3)"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,160C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,160C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,138.7C672,128,768,128,864,144C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,160C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Floating elements */}
        <div className="absolute -top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Quote */}
        <div
          className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        >
          <blockquote className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            {quote.text}
          </blockquote>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium">
            {quote.author}
          </p>
        </div>

        {/* Date */}
        <div className="mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
