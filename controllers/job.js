const Job = require("../models/job");

const createJob = async (req, res, next) => {
    try {
        const { title, companyName,
            location, salary, description,
            locationType, jobType, skills } = req.body

        if (!title || !companyName || !location || !salary || !description || !locationType || !jobType || !skills) {
            return res.status(400).send("Please fill all the fields")
        }

        const skillsArray = skills.split(",").map((skill) => skill.trim());

        const newJob = new Job({
            title, companyName, location,
            salary, description, locationType,
            jobType, skills: skillsArray,
            refUserId: req.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        await newJob.save();
        res.status(201).send("Job Created Successfully");
    }

    catch (err) {



        next(err)
    }
}

const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find().select(["title", "skills", "companyName"])
            .sort({ createdAt: -1 });
        res.status(200).send(jobs)
    } catch (error) {
        next(err)
    }
}

const getJobById = async (req, res, next) => {
    try {

        const { id } = req.params
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).send("Job Not Found")
        }
        res.status(200).send(job)

    } catch (error) {
        next(error)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const { jobnumber } = req.params;

        const job = await Job.findById(jobnumber);
        const skillsArray = req.body.skill ? req.body.skills.split(",").map((skill) => skill.trim()) : null

        const updatedJob = await Job.findByIdAndUpdate(
            jobnumber, {
            title: req.body.title || job.title,
            companyName: req.body.companyName || job.companyName,
            location: req.body.location || job.location,
            salary: req.body.salary || job.salary,
            description: req.body.description || job.description,
            locationType: req.body.locationType || job.locationType,
            jobType: req.body.jobType || req.jobType,
            skills: skillsArray || job.skills,
            updatedAt: new Date(),
            createdAt: job.createdAt



        }, { new: true }
        );
        res.status(200).send(updatedJob)
    } catch (error) {
        next(err)
    }


}


module.exports = { createJob, getAllJobs, getJobById, updateJob }