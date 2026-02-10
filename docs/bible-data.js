// Bible text data — King James Version (public domain) excerpts
// Each verse is stored as-is; the app chunks them into 15-word pages.

const BIBLE_BOOKS = {
  "Genesis": {
    chapters: {
      1: [
        "In the beginning God created the heaven and the earth.",
        "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
        "And God said, Let there be light: and there was light.",
        "And God saw the light, that it was good: and God divided the light from the darkness.",
        "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
        "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
        "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
        "And God called the firmament Heaven. And the evening and the morning were the second day.",
        "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
        "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
        "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.",
        "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.",
        "And the evening and the morning were the third day.",
        "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years.",
        "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.",
        "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",
        "And God set them in the firmament of the heaven to give light upon the earth.",
        "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",
        "And the evening and the morning were the fourth day.",
        "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.",
        "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.",
        "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.",
        "And the evening and the morning were the fifth day.",
        "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.",
        "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.",
        "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
        "So God created man in his own image, in the image of God created he him; male and female created he them.",
        "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.",
        "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
        "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.",
        "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
      ],
      2: [
        "Thus the heavens and the earth were finished, and all the host of them.",
        "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",
        "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.",
        "These are the generations of the heavens and of the earth when they were created, in the day that the Lord God made the earth and the heavens.",
        "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the Lord God had not caused it to rain upon the earth, and there was not a man to till the ground.",
        "But there went up a mist from the earth, and watered the whole face of the ground.",
        "And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
        "And the Lord God planted a garden eastward in Eden; and there he put the man whom he had formed.",
        "And out of the ground made the Lord God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil."
      ]
    }
  },
  "Psalms": {
    chapters: {
      1: [
        "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.",
        "But his delight is in the law of the Lord; and in his law doth he meditate day and night.",
        "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.",
        "The ungodly are not so: but are like the chaff which the wind driveth away.",
        "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous.",
        "For the Lord knoweth the way of the righteous: but the way of the ungodly shall perish."
      ],
      23: [
        "The Lord is my shepherd; I shall not want.",
        "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
        "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
        "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
        "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
        "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever."
      ],
      91: [
        "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
        "I will say of the Lord, He is my refuge and my fortress: my God; in him will I trust.",
        "Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence.",
        "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.",
        "Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day;",
        "Nor for the pestilence that walketh in darkness; nor for the destruction that wasteth at noonday.",
        "A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.",
        "Only with thine eyes shalt thou behold and see the reward of the wicked.",
        "Because thou hast made the Lord, which is my refuge, even the most High, thy habitation;",
        "There shall no evil befall thee, neither shall any plague come nigh thy dwelling.",
        "For he shall give his angels charge over thee, to keep thee in all thy ways.",
        "They shall bear thee up in their hands, lest thou dash thy foot against a stone.",
        "Thou shalt tread upon the lion and adder: the young lion and the dragon shalt thou trample under feet.",
        "Because he hath set his love upon me, therefore will I deliver him: I will set him on high, because he hath known my name.",
        "He shall call upon me, and I will answer him: I will be with him in trouble; I will deliver him, and honour him.",
        "With long life will I satisfy him, and shew him my salvation."
      ]
    }
  },
  "Proverbs": {
    chapters: {
      1: [
        "The proverbs of Solomon the son of David, king of Israel;",
        "To know wisdom and instruction; to perceive the words of understanding;",
        "To receive the instruction of wisdom, justice, and judgment, and equity;",
        "To give subtilty to the simple, to the young man knowledge and discretion.",
        "A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels.",
        "To understand a proverb, and the interpretation; the words of the wise, and their dark sayings.",
        "The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction."
      ],
      3: [
        "My son, forget not my law; but let thine heart keep my commandments:",
        "For length of days, and long life, and peace, shall they add to thee.",
        "Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:",
        "So shalt thou find favour and good understanding in the sight of God and man.",
        "Trust in the Lord with all thine heart; and lean not unto thine own understanding.",
        "In all thy ways acknowledge him, and he shall direct thy paths.",
        "Be not wise in thine own eyes: fear the Lord, and depart from evil.",
        "It shall be health to thy navel, and marrow to thy bones.",
        "Honour the Lord with thy substance, and with the firstfruits of all thine increase:",
        "So shall thy barns be filled with plenty, and thy presses shall burst out with new wine."
      ]
    }
  },
  "John": {
    chapters: {
      1: [
        "In the beginning was the Word, and the Word was with God, and the Word was God.",
        "The same was in the beginning with God.",
        "All things were made by him; and without him was not any thing made that was made.",
        "In him was life; and the life was the light of men.",
        "And the light shineth in darkness; and the darkness comprehended it not.",
        "There was a man sent from God, whose name was John.",
        "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
        "He was not that Light, but was sent to bear witness of that Light.",
        "That was the true Light, which lighteth every man that cometh into the world.",
        "He was in the world, and the world was made by him, and the world knew him not.",
        "He came unto his own, and his own received him not.",
        "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
        "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.",
        "And the Word was made flesh, and dwelt among us, and we beheld his glory, the glory as of the only begotten of the Father, full of grace and truth."
      ],
      3: [
        "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:",
        "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.",
        "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.",
        "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?",
        "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
        "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit.",
        "Marvel not that I said unto thee, Ye must be born again.",
        "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
        "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        "For God sent not his Son into the world to condemn the world; but that the world through him might be saved."
      ]
    }
  },
  "Romans": {
    chapters: {
      8: [
        "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.",
        "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death.",
        "For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh:",
        "That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit.",
        "For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit.",
        "For to be carnally minded is death; but to be spiritually minded is life and peace.",
        "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
        "What shall we then say to these things? If God be for us, who can be against us?",
        "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?",
        "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?",
        "Nay, in all these things we are more than conquerors through him that loved us.",
        "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,",
        "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
      ]
    }
  },
  "Revelation": {
    chapters: {
      21: [
        "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
        "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.",
        "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.",
        "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
        "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful.",
        "And he said unto me, It is done. I am Alpha and Omega, the beginning and the end. I will give unto him that is athirst of the fountain of the water of life freely.",
        "He that overcometh shall inherit all things; and I will be his God, and he shall be my son."
      ]
    }
  }
};
