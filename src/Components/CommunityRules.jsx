import React from "react";
import { ShieldCheck, MessageCircle, Users, Crown, Ban, Star } from "lucide-react";

const CommunityRules = () => {
  const rules = [
    {
      id: "01",
      title: "Respect Others",
      desc: "Treat every member politely and avoid offensive language.",
      icon: <Users className="w-8 h-8 text-blue-400" />,
    },
    {
      id: "02",
      title: "Relevant Posts Only",
      desc: "Keep discussions meaningful and related to forum topics.",
      icon: <MessageCircle className="w-8 h-8 text-green-400" />,
    },
    {
      id: "03",
      title: "Limited Free Membership",
      desc: "Free members can create only a limited number of posts.",
      icon: <Star className="w-8 h-8 text-yellow-400" />,
    },
    {
      id: "04",
      title: "Unlimited Premium Membership",
      desc: "Get unlimited posts and features with premium membership.",
      icon: <Crown className="w-8 h-8 text-purple-400" />,
    },
    {
      id: "05",
      title: "No Spam or Abuse",
      desc: "Spamming or posting abusive content will lead to warnings.",
      icon: <ShieldCheck className="w-8 h-8 text-red-400" />,
    },
    {
      id: "06",
      title: "Admin Rights",
      desc: "Admins may ban users permanently for breaking rules.",
      icon: <Ban className="w-8 h-8 text-pink-400" />,
    },
  ];

  return (
    <section className="relative rounded-2xl py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Community Rules & Membership
        </h2>

        {/* Main Circle */}
        <div className="relative flex  justify-center items-center">
          

          {/* Rules in Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 lg:gap-20 w-full">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 shadow-md">
                  {rule.icon}
                </div>
                <h3 className="font-semibold text-base md:text-lg">
                  {rule.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityRules;
