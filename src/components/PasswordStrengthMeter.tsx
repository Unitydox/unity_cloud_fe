import React, { useEffect, useState } from "react";
import { KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

interface PasswordStrengthMeterProps {
  password: string;
}

interface Requirement {
  regex: RegExp;
  score: number;
  error: string;
  isMatched: boolean;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const [strength, setStrength] = useState<number>(0);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      regex: /[A-Z]/,
      score: 1,
      error: "Should contain at least one uppercase letter.",
      isMatched: false,
    },
    {
      regex: /[a-z]/,
      score: 1,
      error: "Should contain at least one lowercase letter.",
      isMatched: false,
    },
    {
      regex: /[0-9]/,
      score: 1,
      error: "Should contain at least one number.",
      isMatched: false,
    },
    {
      regex: /[@$!%*#?&]/,
      score: 1,
      error:
        "Should contain at least one special character (@, $, !, %, *, #, ?, &).",
      isMatched: false,
    },
    {
      regex: /.{10,}/,
      score: 1,
      error: "Should be at least 10 characters long.",
      isMatched: false,
    },
  ]);

  function calculateStrength(password: string) {
    let score = 0;
    const updatedRequirements = [...requirements]; // Create a copy of requirements to update

    for (const requirement of updatedRequirements) {
      if (password.match(requirement.regex)) {
        score += requirement.score;
        requirement.isMatched = true;
      } else {
        requirement.isMatched = false;
      }
    }

    setRequirements(updatedRequirements); // Update the state with the new requirements
    return score;
  }

  useEffect(() => {
    const currStrength = calculateStrength(password);
    setStrength(currStrength);
  }, [password]);

  return (
    <div className="mt-2 flex items-center">
      <KeyIcon
        className={`h-5 w-5 ${
          strength === 0 ? "text-gray-300" : "text-green-500"
        }`}
      />
      <div className="mx-2 h-1 flex-1 rounded-full bg-gray-200">
        <div
          className={`h-1 rounded-full bg-green-500 transition-all`}
          style={{ width: (strength / 5) * 100 + "%" || 0 }}
        />
      </div>
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler
          onMouseEnter={() => setOpenPopover(true)}
          onMouseLeave={() => setOpenPopover(false)}
        >
          <ExclamationCircleIcon
            className={`h-5 w-5 ${
              strength === 5 ? "text-gray-300" : "text-red-500"
            }`}
          />
        </PopoverHandler>
        <PopoverContent
          onMouseEnter={() => setOpenPopover(true)}
          onMouseLeave={() => setOpenPopover(false)}
          className="z-50 select-none p-1"
        >
          {requirements.map((req, index) => (
            <div
              key={`req-${index}`}
              className="flex flex-row items-center justify-between p-2"
            >
              <span className="text-xs">{req.error}</span>
              {req.isMatched ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              ) : (
                <XCircleIcon className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PasswordStrengthMeter;
