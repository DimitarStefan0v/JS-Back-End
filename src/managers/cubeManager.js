const uniqid = require('uniqid');
const cubes = [{
    id: '8a747f5n0li1y6kbi',
    name: 'Rubik cube',
    description: 'Classic rubik cube 3x3',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0IRONhMtsdbmUiG9ZvfyCJ5Me1gswXys7g&usqp=CAU',
    difficultyLevel: 3,
}];

exports.getAll = () => cubes.slice();

exports.getById = (cubeId) => cubes.find(x => x.id == cubeId);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData
    };

    cubes.push(newCube);

    return newCube;
};