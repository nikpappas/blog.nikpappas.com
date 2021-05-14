const svgo = require('svgo');
const fs = require('fs');

const imagesToOptimise = [{
        in: 'images/originals/SuperSimpleOscilator_bb.svg',
        out: 'images/SuperSimpleOscilator_bb.svg'
    },
    {
        in: 'images/originals/SuperSimpleOscilator_schem.svg',
        out: 'images/SuperSimpleOscilator_schem.svg'
    },
]


function optimise(){
    for (let image of imagesToOptimise){
        
        console.log(image);
        const content = fs.readFileSync(image.in)
        const optimised = svgo.optimize(content)
        fs.writeFileSync(image.out, optimised.data);
    }
}

optimise()
