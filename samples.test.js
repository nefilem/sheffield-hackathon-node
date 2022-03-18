const {readdirSync, readFileSync} = require( 'fs')
const path = require('path')
const strokesRequired = require('./index')

function loadSamples() {
    const files = readdirSync(path.join('.', 'samples'));

    return files.map(filename => {
        const contents = readFileSync(path.join('.', 'samples', filename), {encoding: 'utf8'})
        const [header, ...lines] = contents.split(/[\r\n]+/)
        const [height, expected] = header.split(',')

        return (
            {
                filename,
                picture: lines.slice(0, parseInt(height)),
                expected: parseInt(expected),
            }
        );
    })
}

describe('Samples from Hackerrank', () => {

    test.each(loadSamples())('Sample input $filename', ({picture, expected}) => {
        expect(strokesRequired(picture)).toEqual(expected)
    })
})