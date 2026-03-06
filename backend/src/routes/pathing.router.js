import {Router} from "express"
import { welcome } from "../controller/welcome";


const router = Router();
router.route('/welcome').post(welcome);  //https://dsa-sheets.onrender.com/api/dsa-sheets/welcome


export default router;