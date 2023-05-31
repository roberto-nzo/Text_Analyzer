import Analyzer from "./service";
import { Request, Response } from "express";


const analyzer = new Analyzer()

export default class AnalyzerController {
    fetchData = (req: Request, res: Response) => {
        analyzer.analyze_input(req, res)
    }
}