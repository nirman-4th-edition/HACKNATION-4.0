"use client"

import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function FeatureCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden h-full">
            <div className="relative h-64">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20124027-bQCU8yheHZjyzmp93bqvnJzFy1IbiY.png"
                alt="People in a field"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#2F5233]">Smart Organic Services</h3>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden h-full">
            <div className="relative h-64">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20124027-bQCU8yheHZjyzmp93bqvnJzFy1IbiY.png"
                alt="Tractor in field"
                className="object-cover w-full h-full object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#2F5233]">Best Quality Standards</h3>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden h-full bg-[#F4D03F]">
            <div className="p-6 flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20124027-bQCU8yheHZjyzmp93bqvnJzFy1IbiY.png"
                  alt="Fresh carrots"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#2F5233]">Agriculture products</h3>
              <Button variant="secondary" className="bg-[#2F5233] text-white hover:bg-[#1F3521]">
                DISCOVER MORE
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

