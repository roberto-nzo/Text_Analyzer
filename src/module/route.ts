import express from 'express'
import AnalyzerController from './controller'


const router = express.Router()
const analyzerController = new AnalyzerController()


router.route('/').post(analyzerController.fetchData)

module.exports = router