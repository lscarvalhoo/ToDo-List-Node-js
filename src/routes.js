import { Router } from "express";
import {
        createTable, getAllActivities, getActivity, insertActivity, updateActivity, deleteActivity,
        getAllIncompletesActivities, getAllCompletesActivities
} from './Infra/Atividade.js';

const router = Router();

router.get('/getActivity', getActivity);
router.get('/getAllActivities', getAllActivities);
router.get('/getAllIncompleteActivities', getAllIncompletesActivities);
router.get('/getAllCompletesActivities', getAllCompletesActivities);
router.post('/insertActivity', insertActivity);
router.put('/updateActivity', updateActivity);
router.delete('/deleteActivity', deleteActivity);

export default router;