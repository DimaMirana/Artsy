import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import HomePage from '../common/components/Home/HomePage.component';
import Typography from '@mui/material/Typography';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000);
    }, [])

    return (
        <div className="not-found">
            <Typography gutterBottom variant="h3" component="div">
                    OOps.....
            </Typography>
            <Typography gutterBottom variant="h3" component="div">
                    The page can not be found.
            </Typography>
            <p>Go back to the <Link href="/">
                <HomePage/>
            </Link></p>
        </div>
    );
}

export default NotFound;