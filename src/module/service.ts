import { Request, Response } from "express"

export default class Analyzer {
    analyze_input = (req: Request, res: Response) => {

        let letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]
        const vowels = ['a', 'i', 'u', 'o', 'e']

        const data = req.body
        // Number of Characters with space
        const withSpace = data.split('')

        // Number of words
        const words: string[] = data.split(' ')
        const wordsHiphen: any = words.map((word: string) => {
            return word.includes('-') ? word.split('-') : word
        })
        const concatenatewords = [].concat(...wordsHiphen)
        let filtered_word: string[] = []
        concatenatewords.forEach((word: any) => {
            let f_word: string = ''
            for (let index: number = 0; index < word.length; index++) {
                letters.includes(word[index].toLowerCase()) ? word[index].toLowerCase() ? f_word += word[index].toLowerCase() : {} : {};
            }
            filtered_word.push(f_word)
        })


        let list_words: string[] = []
        for (let i: number = 0; i < filtered_word.length; i++) {
            if (filtered_word[i] !== '') {
                list_words.push(filtered_word[i])
            }
        }

        // Number of sentences
        const sentence: string[] = data.split('.')

        // Number of time a word occurs
        interface word_count_type {
            [key: string]: any
        }

        let word_count: word_count_type = {}

        for (let i: number = 0; i < list_words.length; i++) {
            const count = list_words.filter(element => element === list_words[i]).length
            word_count[list_words[i]] = { "Occurrences": count, "Percentage": count * 100 / list_words.length }
        }

        let withoutSpace: string = ''
        let char_of_word: string = ''
        let count_syllables: number = 0
        words.forEach((word: string) => {
            // Number of characters without spaces
            word.split('').forEach((w: string) => {
                if (letters.includes(w.toLowerCase())) {
                    withoutSpace += w
                }
            })

            // syllables of each word
            char_of_word = ''
            for (let i: number = 0; i < word.length; i++) {
                char_of_word += word[i]
                const index = char_of_word.length - 1
                if (index === 0) {
                    if (vowels.includes(char_of_word[index].toLowerCase())) {
                        count_syllables += 1
                    }
                } else {
                    if (!vowels.includes(char_of_word[index - 1].toLowerCase()) && vowels.includes(char_of_word[index].toLowerCase())) {
                        count_syllables += 1
                    }
                }
            }
        })
        res.send({
            "Number of characters (including spaces)": withSpace.length,
            "Number of characters (without spaces)": withoutSpace.length,
            "Number of words": list_words.length,
            "Number of sentences": sentence.length - 1,
            "Number of syllables": count_syllables,
            "words": word_count
        })
    }
}