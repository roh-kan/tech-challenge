-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- INSERT INTO main."Startups"(name, funding_raised, size, id) VALUES
-- ('Tesla Software Solutions',500000,3,'20f1faef-3db2-40a4-8724-e736ad72af8b'),
-- ('Earth Solutions Pte Ltd',1000000,10,'7b1859cf-da80-4224-8b92-ac868dea5bdf');
TRUNCATE main."Startups";
